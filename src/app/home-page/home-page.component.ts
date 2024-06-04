import { Component, OnInit,ViewChild} from '@angular/core';
import { PredictionEvent } from '../prediction-event';
import { PokelistComponent } from '../components/pokelist/pokelist.component';
import { PokeServiceService } from '../services/poke-service.service';
import { Pokedata } from '../data/poke-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  answer: String = "?";
  score: number = 0;
  checkGesture: boolean = true;
  showHint: boolean = false;
  gotCorrect: boolean = false;
  type: String = "?";
  scoreUpdated: boolean = true;

  @ViewChild(PokelistComponent)
  private pokeListComponent: PokelistComponent;

  constructor(private PokeService:PokeServiceService) { }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    this.pokeListComponent.detectedGesture = this.gesture;
    if (this.showHint){
      this.type = this.pokeListComponent.correct.type;
    }
    else{
      this.type = "?";
    }

    if(this.pokeListComponent.shouldCheckGesture){
      setTimeout(() => {
        this.correctGesture(this.gesture, this.pokeListComponent.correct, this.pokeListComponent.currMons);
      }, 2000); // Delay of 5 seconds, adjust as needed
    }
    else if (this.pokeListComponent.shouldCheckGesture==false && this.gesture== "Point and Closed Hands"){
      this.showHint = false;
      this.gotCorrect = false;
      this.pokeListComponent.onClick();
      this.pokeListComponent.shouldCheckGesture = true;
    }
  }

  correctGesture(gesture: String, correct: Pokedata, currMons: Pokedata[]){ 
    let correctIndex: Number = currMons.indexOf(correct);
    let gestureArr: String[] = ["Open Hand", "Two Open Hands", "Closed Hand", "Two Closed Hands", "Hand Pointing"];
    let gestureIndex: Number = gestureArr.indexOf(gesture);
    if(correctIndex == gestureIndex && this.pokeListComponent.shouldCheckGesture){
      this.answer = "CORRECT ANSWER";
      this.gotCorrect = true;
      this.score += 1;
      this.pokeListComponent.shouldCheckGesture = false;
    }
    else{
      //after they do the wrong gesture and ask for a hint
      if(correctIndex == gestureIndex){
        this.answer = "CORRECT ANSWER";
        this.gotCorrect = true;
        this.pokeListComponent.shouldCheckGesture==false;
      }
      else if (this.gesture == "Open and Closed Hands" && this.gesture !== "None"){
        this.showHint = true;
        this.type = this.pokeListComponent.correct.type;
      }
      else if (this.gesture != "None" && gestureIndex != correctIndex){
        if (!this.gotCorrect){
          this.answer = "WRONG: HINT(CLOSED AND OPEN HAND)";
        }
      }
      else{
        if (!this.gotCorrect){
          this.answer = "?";
        }
      }
    }
  }


}

