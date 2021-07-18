import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  num1: number;
  num2: number;
  operators = ['-', '+'];
  operator;
  answer= '';
  rightAnswer;
  
  constructor() {}

  ngOnInit() {
    this.generateNewQuestion();
    console.log(this.num1);
    console.log(this.num2);
    console.log(this.rightAnswer);
  }

  generateRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  returnResult(num1, operator, num2) {
    if(operator === '-') {
      return num1 - num2
    } else {
      return num1 + num2
    }
  }

  resetAnswer() {
    this.answer = '';
    console.log(this.answer);
  }

  pushInAnswer(num) {
    this.answer+=num;
    console.log(this.answer);
  }

  sendAnswer() {
    console.log(this.rightAnswer);
    console.log(this.answer);
    if (this.rightAnswer === +this.answer) {
      alert('right!');
      this.generateNewQuestion()
    }  else {
      alert('wrong!');
      this.answer = '';
    } 
  }

  generateNewQuestion() {
    this.num1 = this.generateRandomNum(50, 100);
    this.num2 = this.generateRandomNum(0, 50);
    this.operator = this.operators[Math.random() < 0.5 ? 1 : 0];
    this.rightAnswer = this.returnResult(this.num1, this.operator, this.num2);
    this.resetAnswer();
  }

}