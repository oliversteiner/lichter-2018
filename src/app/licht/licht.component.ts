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
    allDevicesStatus = false;

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

    toggleAllDevices() {

        if (this.allDevicesStatus === false) {
            this.allDevicesStatus = true;

            for (const device of this.devices) {
                device.power = true;

            }

        } else {
            this.allDevicesStatus = false;

            for (const device of this.devices) {
                device.power = false;

            }
        }

    }

    toggleDetails(device: Device) {
        device.showSensor = device.showSensor !== true;
    }
}
