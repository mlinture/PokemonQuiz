import { Component, ViewChild,AfterViewInit, ElementRef, Renderer2} from '@angular/core';
import { Pokedata } from 'src/app/data/poke-data';
import { PokeServiceService } from 'src/app/services/poke-service.service';
import {HandtrackerComponent} from 'src/app/handtracker/handtracker.component';

@Component({ 
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.css']
})
export class PokelistComponent{
  currMons:Pokedata[];
  correct:Pokedata;
  MIN = 1;
  MAX = 891;
  detectedGesture: String = '';
  counter: number = 0;
  prevCounter: number = 0;
  questionNum: number = 1;
  shouldCheckGesture: boolean = true;


  constructor(private PokeService:PokeServiceService, private renderer: Renderer2
  ) { 
  }

  ngOnInit(){
    this.onClick();
  }

  async getMonInfo(){
    const promises = [];
    for (let count = 0; count < 5; count++) {
      let randomNum = Math.floor(Math.random() * (this.MAX - this.MIN + 1)) + this.MIN;
      promises.push(this.PokeService.generateMon(randomNum.toString()));
    }
  
    const result = await Promise.all(promises);
    return result;
  }

  pickCorrect(){
    let targVal = Math.floor(Math.random()*5);
    console.log(`targ val : ${targVal} --- currMons: ${this.currMons}`);
    this.correct = this.currMons[targVal];
  }

  async refresh(){
    try {
      const result = await this.getMonInfo();
      this.currMons = result;
      // Call pickCorrect after you've set currMons to ensure it's not undefined
      this.pickCorrect();
    } catch(error) {
      console.error('Error fetching Pokemon data:', error);
    }
  }

  onClick(){
    this.refresh();
    setTimeout(()=> {
      this.pickCorrect();
      this.prevCounter = this.counter;
      this.counter+=1;
      this.shouldCheckGesture = true;
      this.questionNum += 1;
    }, 0);
  }
}
