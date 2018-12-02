import {Component, OnInit} from '@angular/core';
import {Device} from '../_models/devices';
import {DEVICES} from '../../assets/data/devices';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {MqttResponse} from '../_models/mqttResponse';


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

    // General
    title = 'Lichtstatus';
    powerStatusAllDevices = false;

    // Devices from Data
    devices: Device[] = DEVICES;

// MQTT
    public power: string;
    public sensor: string;

    constructor(private _mqttService: MqttService) {


        // set Status of sensorDetails to 'closed'
        for (const device of this.devices) {
            device.sensorDetails = false;
            device.timerIcon = 'Timer';
            device.powerIcon = 'Power';
            device.sensorIcon = 'Sensor';

            // Subscriptions
            // -----------------------------------------------------

            // Subscription Power
            device.subscriptionPower = this._mqttService.observe('stat/' + device.id + '/POWER')
                .subscribe((message: IMqttMessage) => {

                    console.log(device.id + ' Power:', message.payload.toString());
                    const status = message.payload.toString();

                    // Check
                    switch (status) {
                        case 'ON':
                            device.power = true;
                            break;
                        case 'OFF':
                            device.power = false;
                            break;
                        default:
                            device.power = false;
                            break;
                    }

                });

            // Subscription Sensor
            if (device.sensor) {
                device.subscriptionPower = this._mqttService.observe('tele/' + device.id + '/SENSOR')
                    .subscribe((message: IMqttMessage) => {

                        console.log(device.id + ' Sensor:', message.payload.toString());
                        const mqttResponse: MqttResponse = JSON.parse(message.payload.toString());

                        // Set updated data to Device
                        device.temperature = mqttResponse.AM2301.Temperature;
                        device.humidity = mqttResponse.AM2301.Humidity;
                    });
            }


            this.getPowerStatus(device);

        }
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
            this.powerOff(device);

        } else {
            this.powerOn(device);

            device.power = true;
        }
    }

    toggleAllDevices() {

        if (this.powerStatusAllDevices === false) {
            this.powerStatusAllDevices = true;

            for (const device of this.devices) {
                device.power = true;

            }

        } else {
            this.powerStatusAllDevices = false;

            for (const device of this.devices) {
                device.power = false;

            }
        }

    }

    toggleDetails(device: Device) {
        device.sensorDetails = device.sensorDetails !== true;
        this.getSensorData(device);
    }


    public powerOn(device): void {
        const topic = 'cmnd/' + device.id + '/power';
        const message = 'ON';

        // get data
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public powerOff(device): void {
        const topic = 'cmnd/' + device.id + '/power';
        const message = 'OFF';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public getPowerStatus(device): void {
        const topic = 'cmnd/' + device.id + '/power';
        const message = '';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }


    public getTimerStatus(device): void {
        const topic = 'cmnd/' + device.id + '/power';
        const message = '';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public getSensorData(device): void {
        const topic = 'cmnd/' + device.id + '/TelePeriod';
        let message = '10';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

        setTimeout(() => {
                message = '60';
                this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
            },
            1000
        );
    }

}
