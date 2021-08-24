import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsService {

    selectedOperators = [];
    roundLength = 5;

    constructor() { }

}