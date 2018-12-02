import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {faLightbulbOn} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lichter 2018';
    faCoffee = faCoffee;
    faLightbulbOn = faLightbulbOn;

}
