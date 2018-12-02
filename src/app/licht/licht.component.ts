import {Component, OnInit} from '@angular/core';
import {Device} from '../_models/devices';
import {DEVICES} from '../../assets/data/devices';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
    selector: 'app-licht',
    templateUrl: './licht.component.html',
    styleUrls: ['./licht.component.scss'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '50px',
                opacity: 1,
            })),
            state('closed', style({
                height: '0px',
                opacity: 0,
            })),
            transition('open => closed', [
                animate('0.2s')
            ]),
            transition('closed => open', [
                animate('0.2s')
            ]),
        ]),
    ],
})

export class LichtComponent implements OnInit {

    title = 'Lichtstatus';
    allDevicesStatus = false;

    devices: Device[] = DEVICES;

    constructor() {

        // set Status of sensorDetails to 'closed'
        for (const device of this.devices) {
            device.sensorDetails = false;
            device.timerIcon = 'Timer';
            device.powerIcon = 'Power';
            device.sensorIcon = 'Sensor';

        }
    }

    ngOnInit() {
    }

    toggleTimer(device: Device): void {
        if (device.timer === true) {
            device.timer = false;
        }
         else {
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
        device.sensorDetails = device.sensorDetails !== true;
    }
}
