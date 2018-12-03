import {Component, OnInit} from '@angular/core';
import {appVersion} from '../app.version';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    appVersion = appVersion;

    constructor() {
    }

    ngOnInit() {
    }

}
