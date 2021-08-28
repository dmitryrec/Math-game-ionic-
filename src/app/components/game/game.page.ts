import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss']
})
export class GamePage {

  num1: number;
  num2: number;
  operators = this.settingsService.selectedOperators;
  operator: string;
  answer: string= '';
  rightAnswer;
  devidedNums = [];
  round = 1;  
  gameIsOver = false;

  constructor(public settingsService: SettingsService) {}

  ionViewWillEnter() {
    this.operators = this.settingsService.selectedOperators;
    this.generateNewQuestion();
  }

  generateRandomNum(min, max): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  returnResult(num1, operator, num2): number {
    switch(operator) {
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

  resetAnswer() {
    this.answer = '';
  }

  pushInAnswer(num: number) {
    this.answer+=num;
  }

  sendAnswer() {
    console.log(this.rightAnswer);
    console.log(this.answer);
    if (this.rightAnswer === +this.answer) {
      alert('right!');
      this.round++;
      this.round <= this.settingsService.roundLength ? 
      this.generateNewQuestion() : 
      this.completeGame();
    } else {
      alert('wrong!');
      this.answer = '';
    } 
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
    this.resetAnswer();
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
    this.round = this.settingsService.roundLength;
    if (restart) {
      this.generateNewQuestion();
    }
  }

}