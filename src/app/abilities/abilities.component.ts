import { Component, OnInit } from '@angular/core';
import actionShot1 from '../../assets/actionShot1.json';
import disarmingShot from '../../assets/disarmingShot1.json';
import knockdownFire from '../../assets/knockdownFire.json';
import sprayShot from '../../assets/sprayShot.json';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css']
})
export class AbilitiesComponent implements OnInit {

  JsonData: any = [actionShot1, disarmingShot, knockdownFire, sprayShot];

  constructor() { 
    // DEBUG
    console.log(this.JsonData);
  }

  ngOnInit(): void {
  }

}
