import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';

@Component({
    selector: 'app-mqtt-sandbox',
    templateUrl: './mqtt-sandbox.component.html',
    styleUrls: ['./mqtt-sandbox.component.scss']
})


export class MqttSandboxComponent implements OnInit, OnDestroy {
    private subscription_world: Subscription;
    private subscription_power: Subscription;
    private subscription_sensor: Subscription;
    private subscription_status: Subscription;
    private subscription_test: Subscription;
    private subscription_result: Subscription;
    public message: string;
    public power: string;
    public sensor: string;
    public status: string;
    public testresult: string;
    public test_topic: string;
    private test_message: any;
    private result: any;


    constructor(private _mqttService: MqttService) {

        //  this.test_topic = 'sonoff/Timers';
        //  this.test_topic = 'sonoff/SENSOR';
        this.test_topic = 'cmnd/sonoff/Timer1';
        this.test_message = '{"Arm":1,"Time":"01:57","Window":0,"Days":"SM00TFS","Repeat":1,"Output":1,"Action":1}';

        this.subscription_world = this._mqttService.observe('/World').subscribe((message: IMqttMessage) => {
            console.log('message', message.payload);
            this.message = message.payload.toString();

        });


        this.subscription_power = this._mqttService.observe('stat/sonoff/POWER').subscribe((message: IMqttMessage) => {
            console.log('power', message.payload);
            this.power = message.payload.toString();

        });

        this.subscription_sensor = this._mqttService.observe('tele/sonoff/SENSOR').subscribe((message: IMqttMessage) => {
            console.log('sensor', message.payload);

            this.sensor = message.payload.toString();
            console.log('sensor', this.sensor);


        });

        this.subscription_status = this._mqttService.observe('tele/sonoff/STATE').subscribe((message: IMqttMessage) => {
            console.log('status', message.payload);

            this.status = message.payload.toString();
            console.log('status', this.status);


        });

        this.subscription_result = this._mqttService.observe('tele/sonoff/RESULT').subscribe((message: IMqttMessage) => {
            console.log('result', message.payload);

            this.result = message.payload.toString();
            console.log('result', this.result);


        });

        if (this.test_topic !== '') {
            this.subscription_test = this._mqttService.observe(this.test_topic).subscribe((message: IMqttMessage) => {
                console.log('test', message.payload);

                this.testresult = message.payload.toString();
                console.log('test', this.testresult);


            });
        }
    }


    public powerOn(): void {
        const topic = 'cmnd/sonoff/power';
        const message = 'ON';

        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public powerOff(): void {
        const topic = 'cmnd/sonoff/power';
        const message = 'OFF';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public getPowerStatue(): void {
        const topic = 'cmnd/sonoff/power';
        const message = '';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    public getStatus(): void {
        const topic = 'cmnd/sonoff/status';
        const message = '8';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }


    public getSensorData(): void {
        const topic = 'cmnd/sonoff/TelePeriod';
        let message = '10';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

        setTimeout(() => {
                message = '60';
                this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
            },
            1000
        );
    }

    public setTimezone(): void {
        const topic = 'cmnd/sonoff/Timezone';
        const message = '1';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    /**
     * TEST
     *
     */
    public test(): void {
        const topic = this.test_topic;
        const message = this.test_message;
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }




    public ngOnDestroy() {

        const topic = 'cmnd/sonoff/TelePeriod';
        const message = '1';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});


        this.subscription_world.unsubscribe();
        this.subscription_power.unsubscribe();
        this.subscription_sensor.unsubscribe();
        this.subscription_status.unsubscribe();
        this.subscription_test.unsubscribe();
        this.subscription_result.unsubscribe();


    }

    public ngOnInit(): void {

    }
}
