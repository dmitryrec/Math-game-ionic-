import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  num1: number;
  num2: number;
  operators = ['+', '-', '*', '/'];
  operator;
  answer= '';
  rightAnswer;
  devidedNums = [];
  
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
    } else {
      alert('wrong!');
      this.answer = '';
    } 
  }

  generateNewQuestion() {
    this.operator = this.operators[this.generateRandomNum(0, 4)];
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

  generateDevidedNums(min, max) {
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

}