import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  operatorsForRender = ['+', '-', '*', '/'];
  operatorsState = {};

  constructor(public settingsService: SettingsService) {}

  ionViewWillEnter() {
    this.settingsService.selectedOperators = [];
    this.operatorsState = {
      '+': false, 
      '-': false, 
      '*': false, 
      '/': false
    };
  }

  setOperatorsState(selectedOperator: string) {
    this.operatorsState[selectedOperator] = !this.operatorsState[selectedOperator];
    if (this.settingsService.selectedOperators.find(operator => operator === selectedOperator)) {
      const indexToRemove = this.settingsService.selectedOperators.indexOf(selectedOperator);
      this.settingsService.selectedOperators.splice(indexToRemove, 1);
    } else {
      this.settingsService.selectedOperators.push(selectedOperator);
    }
  }

}
