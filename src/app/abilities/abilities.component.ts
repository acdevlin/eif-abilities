import { Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import actionShot1 from '../../assets/actionShot1.json';
import disarmingShot from '../../assets/disarmingShot1.json';
import knockdownFire from '../../assets/knockdownFire.json';
import sprayShot from '../../assets/sprayShot.json';
import mindShot1 from '../../assets/mindShot1.json';
import healthShot1 from '../../assets/healthShot1.json';
import scatterShot1 from '../../assets/scatterShot1.json';
import activateQuest from '../../assets/activateQuest.json';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements AfterViewInit {

  jsonData: any = [actionShot1, mindShot1, healthShot1, scatterShot1, disarmingShot, knockdownFire, sprayShot, activateQuest];
  displayedColumns: string[] = ['name', 'weaponType', 'damageMultiplier', 'speedMultiplier', 'accuracyBonus', 'hamCosts', 'poolsToDamage',  'dotEffects', 'stateEffects'];
  dataSource = new MatTableDataSource(this.jsonData);
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // DEBUG
    console.log(this.jsonData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public getTargetPoolColor(targetAttribute :string) {
    switch(targetAttribute) {
      case "HEALTH_ATTRIBUTE": return "lightcoral"
      case "ACTION_ATTRIBUTE": return "lightgreen"
      case "MIND_ATTRIBUTE": return "lightblue"
      default: return "plum"
    }
    
  }

  public getDotColor(targetPool :string) : string {
    switch(targetPool) {
      case "HEALTH": return "lightcoral"
      case "ACTION": return "lightgreen"
      case "MIND": return "lightblue"
      default: return "plum"
    }
  }

  public getStateColor(stateType :string) : string {
    switch(stateType) {
      case "DIZZY_EFFECT": return "lightcoral"
      case "BLIND_EFFECT": return "lightblue"
      case "STUN_EFFECT": return "plum"
      case "KNOCKDOWN_EFFECT": return "lightgreen"
      case "NEXTATTACKDELAY_EFFECT": return "cornsilk"
      default: return "tan"
    }

  }
}
