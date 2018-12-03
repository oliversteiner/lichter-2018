import {Component, OnInit} from '@angular/core';
import {Device} from '../_models/devices';
import {DEVICES} from '../../assets/data/devices';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {MqttResponse} from '../_models/mqttResponse';
import {faTemperatureFrigid} from '@fortawesome/pro-light-svg-icons';
import {ConfigService} from '../_services/config.service';

@Component({
    selector: 'app-sensoren',
    templateUrl: './sensoren.component.html',
    styleUrls: ['./sensoren.component.scss']
})
export class SensorenComponent implements OnInit {

    // General
    title = 'Sensoren';
    id = 'sensoren';
    debug = false;

    // Devices from Data
    devices: Device[] = DEVICES;

    // Icons
    iconSensor = faTemperatureFrigid;

    constructor(private _mqttService: MqttService, private _config: ConfigService) {

        // Debug
        this.debug = this._config.debug;

        // Navigation
        this._config.setActivePage(this.id);

        for (const device of this.devices) {

            // Subscriptions
            // -----------------------------------------------------

            // Subscription Sensor
            if (device.sensor) {
                device.subscriptionSensor = this._mqttService.observe('tele/' + device.id + '/SENSOR')
                    .subscribe((message: IMqttMessage) => {

                        // Debug
                        // console.log(device.id + ' Sensor:', message.payload.toString());

                        // Device Online?
                        device.online = true;

                        const mqttResponse: MqttResponse = JSON.parse(message.payload.toString());

                        // Set updated data to Device
                        device.temperature = mqttResponse.AM2301.Temperature;
                        device.humidity = mqttResponse.AM2301.Humidity;
                    });
            }
            this.getSensorData(device);
        }
    }

    ngOnInit() {

        // Navigation
        this._config.setActivePage(this.id);
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


    getAllData() {
        for (const device of this.devices) {

            if (device.sensor) {
                // console.log('devices', device);

                this.getSensorData(device);
            }
        }
    }
}
