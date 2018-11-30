import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';

@Component({
    selector: 'app-mqtt-sandbox',
    templateUrl: './mqtt-sandbox.component.html',
    styleUrls: ['./mqtt-sandbox.component.scss']
})


export class MqttSandboxComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private subStatus: Subscription;
    public message: string;
    public status2: string;


    constructor(private _mqttService: MqttService) {
/*
        this.subscription = this._mqttService.observe('/World').subscribe((message: IMqttMessage) => {
            this.message = message.payload.toString();
            console.log('message', this.message);

        });
*/

        this.subStatus = this._mqttService.observe('stat/sonoff/POWER').subscribe((message: IMqttMessage) => {
            this.status2 = message.payload.toString();
            console.log('status2', this.status2);

        });
    }

    public unsafePublish(topic: string, message: string): void {
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
    }

    public powerOn(): void {
        const topic = 'cmnd/sonoff/power';
        const message = 'ON';

        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public powerOff(): void {
        const topic = 'cmnd/sonoff/power';
        const message = 'Off';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public getStatus(): void {
        const topic = 'cmnd/sonoff/power';
        const message = '';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public ngOnInit(): void {

    }
}
