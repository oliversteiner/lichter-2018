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
    public message: string;


    constructor(private _mqttService: MqttService) {
        this.subscription = this._mqttService.observe('/World').subscribe((message: IMqttMessage) => {
            this.message = message.payload.toString();
        });
    }

    public unsafePublish(topic: string, message: string): void {
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
    }

    public powerOn(): void {
        const topic = 'cmnd/sonoff/power';
        const message = 'ON';

        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public powerOff(): void {
        const topic = 'cmnd/sonoff/power';
        const message = 'Off';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }


    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public ngOnInit(): void {

    }
}
