import { Component, ElementRef, ViewChild } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AnimationController, Animation } from '@ionic/angular';
import { Interface } from 'readline';

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss']
})
export class GamePage {

  @ViewChild('answerReaction', {static: false}) answerReaction: ElementRef;
  animation: Animation;

  num1: number;
  num2: number;
  operators = this.settingsService.selectedOperators;
  operator: string;
  answer: string = '';
  rightAnswer;
  devidedNums = [];
  round: number;
  gameIsOver = false;
  secondsCount: number;
  remaningTimeStream$ = null;
  timeRectangles;
  keyboardNums = [...Array(9).keys()];
  rightAnswers: number;

  constructor(
    public settingsService: SettingsService, 
    public animationCtrl: AnimationController
    ) {
  }

  ionViewWillEnter() {
    this.rightAnswers = 0;
    this.round = 1;
    this.operators = this.settingsService.selectedOperators;
    this.timeRectangles = [...Array(this.settingsService.secondsOnAnswer).
      keys()].
      map(el => el+1);
    this.generateNewQuestion();
    this.animation = this.animationCtrl.create();
    this.animation.addElement(this.answerReaction.nativeElement)
    .duration(1000)
    .easing('ease-out')
    .iterations(1)
    .fromTo('opacity', 0.3, 0);
  }

  generateRandomNum(min, max): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  returnResult(num1, operator, num2): number {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
    }
  }

  resetAnswer(rounsIsOver: boolean) {
    this.answer = '';
    if (rounsIsOver) {
      this.secondsCount = this.settingsService.secondsOnAnswer;
    }
  }

  pushInAnswer(num: number) {
    this.answer += num;
  }

  sendAnswer() {
    console.log(this.rightAnswer);
    console.log(this.answer);
    if (this.rightAnswer === +this.answer) {
      this.checkGameIsOver();
      this.rightAnswers +=1;
    } else {
      this.animation.play();
      this.answer = '';
    }
  }

  checkGameIsOver() {
    this.round++;
    this.round <= this.settingsService.roundLength ?
    this.generateNewQuestion() :
    this.completeGame();
  }

  generateNewQuestion() {
    this.operator = this.operators[this.generateRandomNum(0, this.operators.length)];
    if (this.operator === "/") {
      this.devidedNums = this.generateDevidedNums(10, 80);
      let randomDevidedAnswer = this.devidedNums[this.generateRandomNum(0, this.devidedNums.length - 1)];
      this.num1 = randomDevidedAnswer.num;
      this.num2 = randomDevidedAnswer.divider;
    } else {
      this.num1 = this.generateRandomNum(50, 100);
      this.num2 = this.generateRandomNum(0, 50);
    }
    this.rightAnswer = this.returnResult(this.num1, this.operator, this.num2);
    this.resetAnswer(true);
    this.remaningTimeStream$ && this.remaningTimeStream$.unsubscribe();
    this.remaningTimeStream$ = interval(1000).pipe(take(this.settingsService.secondsOnAnswer)).subscribe(() => {
      this.secondsCount -= 1;
      if (this.secondsCount < 1) {
        this.checkGameIsOver();
      }
    }); 
  }

  generateDevidedNums(min: number, max: number) {
    let devidedArray = [];
    for (let i = min; i < max; i++) {
      for (let k = 2; k <= i; k++) {
        if (i % k === 0 && k !== 1 && k !== i) {
          devidedArray.push({ "num": i, "divider": k });
        }
      }
    }
    return devidedArray;
  }

  completeGame() {
    this.gameIsOver = true;
  }

  resetGame(restart?) {
    this.gameIsOver = false;
    this.round = 1;
    if (restart) {
      this.generateNewQuestion();
    }
  }

}
