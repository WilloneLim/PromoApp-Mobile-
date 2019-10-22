import { Injectable } from '@angular/core';
@Injectable()
export class canGoBack {
	private canGoBack = true;
	constructor() {}
  
  public setValue(value: boolean) {
    this.canGoBack = value;
  }
  
  public getValue(): boolean {
    return this.canGoBack;
  } 
}