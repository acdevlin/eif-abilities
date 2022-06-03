import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import allAbilities from '../../assets/AllAbilities.json';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements AfterViewInit {

  jsonData: any = allAbilities;
  displayedColumns: string[] = ['name', 'weaponType', 'damageMultiplier', 'speedMultiplier', 'accuracyBonus', 'range', 'hamCosts', 'poolsToDamage',  'dotEffects', 'stateEffects'];
  dataSource = new MatTableDataSource(this.jsonData);
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // DEBUG
    console.log(this.jsonData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getTargetPoolColor(targetAttribute :string) {
    switch(targetAttribute) {
      case "HEALTH_ATTRIBUTE": return "lightcoral"
      case "ACTION_ATTRIBUTE": return "lightgreen"
      case "MIND_ATTRIBUTE": return "lightblue"
      case "NO_ATTRIBUTE": return "lightgray"
      default: return "plum"
    }
    
  }

  public getDotColor(targetPool :string) : string {
    switch(targetPool) {
      case "HEALTH": return "lightcoral"
      case "ACTION": return "lightgreen"
      case "MIND": return "lightblue"
      default: return "lightgray"
    }
  }

  public getStateColor(stateType :string) : string {
    switch(stateType) {
      case "DIZZY": return "lightcoral"
      case "BLIND": return "lightblue"
      case "STUN": return "plum"
      case "KNOCKDOWN": return "lightgreen"
      case "NEXTATTACKDELAY": return "cornsilk"
      default: return "tan"
    }

  }
}
