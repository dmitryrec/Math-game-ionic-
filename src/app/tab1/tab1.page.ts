import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items = [
    {
      header: 'Header 1',
      text: 'Text 1'
    },
    {
      header: 'Header 2',
      text: 'Text 2'
    },
  ];

  constructor() {}

}
