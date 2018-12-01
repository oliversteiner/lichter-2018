import {Component, OnInit} from '@angular/core';
import {Device} from '../_models/devices';
import {DEVICES} from '../../assets/data/devices';


@Component({
    selector: 'app-licht',
    templateUrl: './licht.component.html',
    styleUrls: ['./licht.component.scss']
})

export class LichtComponent implements OnInit {

    title = 'Lichtstatus';

    devices: Device[] = DEVICES;

    constructor() {
    }

    ngOnInit() {
    }

    toggleTimer(device: Device): void {
        if (device.timer === true) {
            device.timer = false;
        } else {
            device.timer = true;
        }
    }

    togglePower(device: Device): void {
        if (device.power === true) {
            device.power = false;
        } else {
            device.power = true;
        }
    }
}
