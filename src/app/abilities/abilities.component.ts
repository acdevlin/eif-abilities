import { Component, OnInit } from '@angular/core';
import actionShot1 from '../../assets/actionShot1.json';
import disarmingShot from '../../assets/disarmingShot1.json';
import knockdownFire from '../../assets/knockdownFire.json';
import sprayShot from '../../assets/sprayShot.json';
import mindShot1 from '../../assets/mindShot1.json';
import healthShot1 from '../../assets/healthShot1.json';
import scatterShot1 from '../../assets/scatterShot1.json';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit {

  jsonData: any = [actionShot1, mindShot1, healthShot1, scatterShot1, disarmingShot, knockdownFire, sprayShot];
  displayedColumns: string[] = ['name', 'weaponType', 'damageMultiplier', 'speedMultiplier', 'accuracyBonus', 'hamCosts', 'poolsToDamage',  'dotEffects', 'stateEffects'];
  dataSource = this.jsonData;

  constructor() {
    // DEBUG
    console.log(this.jsonData);
  }

  ngOnInit(): void {
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
