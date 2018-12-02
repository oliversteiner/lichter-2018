import {Component, OnDestroy, OnInit} from '@angular/core';
import {SonoffTimer} from '../_models/sonoffTimer';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import {MqttResponse} from '../_models/mqttResponse';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
    private title = 'Timer';
    private powerOnLabel = 'Einschalten';
    private powerOffLabel = 'Ausschalten';

    private timerStatus: string;
    private subscription_result: Subscription;
    private result: string;
    private sonoffTimer: SonoffTimer;
    private sonoffTimerOn: SonoffTimer;  // Timer1
    private sonoffTimerOff: SonoffTimer; // Timer2
    private currentTimer: number;

    constructor(private _mqttService: MqttService) {

        this.currentTimer = 1;
        this.sonoffTimer = new SonoffTimer();

        // get Timer1

        // Result Response
        this.subscription_result = this._mqttService.observe('stat/sonoff/RESULT')
            .subscribe((message: IMqttMessage) => {

                this.result = message.payload.toString();
                console.log('result', this.result);

                const mqttResponse: MqttResponse = JSON.parse(message.payload.toString());


                // Timer
                if (mqttResponse.Timer1) {
                    this.sonoffTimer = mqttResponse.Timer1;

                    this.checkTimerStatus();

                }

            });

        this.getTimerStatus();


    }

    private checkTimerStatus() {
    // Check status
        if (this.sonoffTimer && this.sonoffTimer.Arm) {
            switch (this.sonoffTimer.Arm) {
                case 1:
                    this.timerStatus = 'Timer an';
                    break;
                case 0:
                    this.timerStatus = 'Timer aus';
                    break;
                default:
                    this.timerStatus = 'Timer Status unbekannt';
                    break;
            }
        }
    }

    ngOnInit() {

    }

    toggleTimer() {

        this.sonoffTimer.Arm = this.sonoffTimer.Arm === 1 ? 0 : 1;
        this.checkTimerStatus();

    }

    public getTimerStatus(): void {
        const topic = 'cmnd/sonoff/Timer';
        const message = '1';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }


    editTime(modus: string) {

        switch (modus) {
            case 'on':
                break;

            case 'off':
                break;

            default:
                break;
        }

    }

    jsonToList(json) {


    }


    public ngOnDestroy() {
        this.subscription_result.unsubscribe();

    }

    setOnTimer() {
        //
        this.setTimer(1, this.sonoffTimer);
    }


    public setTimer(timerNumber: number, data: SonoffTimer): void {
        const topic = 'cmnd/sonoff/Timer' + timerNumber;
        const message = JSON.stringify(data);
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

}
