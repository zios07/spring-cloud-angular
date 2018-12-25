import { Component, TemplateRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
})
export class AppComponent {
  constructor() {}

  @Output() login = new EventEmitter();

  public onLogin(user){
    console.log(user);
  }


}