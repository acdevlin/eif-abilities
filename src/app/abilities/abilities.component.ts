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
  displayedColumns: string[] = ['name', 'weaponType', 'damageMultiplier', 'speedMultiplier', 'dps', 'coneAction', 'accuracyBonus', 'range', 'hamCosts', 'poolsToDamage', 'dotEffects', 'stateEffects'];
  dataSource = new MatTableDataSource(this.jsonData);
  panelOpenState = false;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getTargetPoolColor(targetAttribute: string) {
    switch (targetAttribute) {
      case "HEALTH_ATTRIBUTE": return "lightcoral"
      case "ACTION_ATTRIBUTE": return "lightgreen"
      case "MIND_ATTRIBUTE": return "lightblue"
      case "NO_ATTRIBUTE": return "lightgray"
      default: return "plum"
    }

  }

  public getDotColor(targetPool: string): string {
    switch (targetPool) {
      case "HEALTH": return "lightcoral"
      case "HEALTH_POOL": return "lightcoral"
      case "ACTION": return "lightgreen"
      case "ACTION_POOL": return "lightgreen"
      case "MIND": return "lightblue"
      case "MIND_POOL": return "lightblue"
      default: return "lightgray"
    }
  }

  public getStateColor(stateType: string): string {
    switch (stateType) {
      case "DIZZY": return "lightcoral"
      case "BLIND": return "lightblue"
      case "STUN": return "plum"
      case "KNOCKDOWN": return "lightgreen"
      case "NEXTATTACKDELAY": return "cornsilk"
      case "INTIMIDATE": return "orange"
      case "POSTUREDOWN": return "tan"
      default: return "lightgray"
    }
  }

  public getRange(range: string): string {
    if (range == "-1") { return "weapon"; }
    return range;
  }

  public getAoE(coneAction: boolean, coneAngle: string, areaAction: boolean, areaRange: string) {
    if (coneAction) {
      return coneAngle + "° Cone";
    }
    if (areaAction) {
      return areaRange + "m Area";
    }
    return "None";
  }
}
