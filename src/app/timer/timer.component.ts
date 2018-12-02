import {Component, OnDestroy, OnInit} from '@angular/core';
import {SonoffTimer} from '../_models/sonoffTimer';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import {MqttResponse} from '../_models/mqttResponse';
import {Device} from '../_models/devices';
import {DEVICES} from '../../assets/data/devices';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
    private title = 'Timer';
    private powerOnLabel = 'Einschalten';
    private powerOffLabel = 'Ausschalten';

    private powerOnEdit = 0;
    private powerOffEdit = 0;

    private timerStatus: string;
    private subscription_result: Subscription;
    private result: string;
    private sonoffTimers: SonoffTimer[];
    private globalTimerArm: number;

    // Devices from Data
    private devices: Device[] = DEVICES;

    constructor(private _mqttService: MqttService) {

        this.sonoffTimers = [];

        this.sonoffTimers[0] = new SonoffTimer();
        this.sonoffTimers[1] = new SonoffTimer();
        this.globalTimerArm = 0;

        for (const device of this.devices) {

            // get Timer1

            // Result Response
            this.subscription_result = this._mqttService.observe('stat/' + device.id + '/RESULT')
                .subscribe((message: IMqttMessage) => {

                    this.result = message.payload.toString();
                    console.log('result', this.result);

                    const mqttResponse: MqttResponse = JSON.parse(message.payload.toString());


                    // Global Timer Arm
                    if (mqttResponse.Timers && mqttResponse.Timers === 'ON') {
                        this.globalTimerArm = 1;
                    }

                    if (mqttResponse.Timers && mqttResponse.Timers === 'OFF') {
                        this.globalTimerArm = 0;
                    }

                    // Timer Power ON
                    if (mqttResponse.Timers1 && mqttResponse.Timers1.Timer1) {
                        this.sonoffTimers[0] = mqttResponse.Timers1.Timer1;
                    }

                    // Timer Power OFF
                    if (mqttResponse.Timers1 && mqttResponse.Timers1.Timer2) {
                        this.sonoffTimers[1] = mqttResponse.Timers1.Timer2;
                    }

                    // Update GUI
                    this.checkTimerStatus();

                });
        }
        this.getTimerStatus();


    }

    private checkTimerStatus() {
        console.log('this.timerStatus', this.timerStatus);

        this.timerStatus = 'Timer aus';

        // Check status
        if (this.globalTimerArm) {
            this.timerStatus = 'Timer an';
        }


    }

    ngOnInit() {

    }

    toggleTimer() {


        let message = '0';
        const topic = 'cmnd/sonoffs/Timers';

        if (this.globalTimerArm === 1) {
            this.globalTimerArm = 0;
            message = '0';

        } else {
            this.globalTimerArm = 1;
            message = '1';

        }

        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
        this.getTimerStatus();
    }

    public getTimerStatus(): void {
        const topic = 'cmnd/sonoffs/Timers';
        const message = '';
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }

    powerOnEditToggle() {
        this.powerOnEdit = this.powerOnEdit === 1 ? 0 : 1;
    }

    powerOffEditToggle() {
        this.powerOffEdit = this.powerOffEdit === 1 ? 0 : 1;
    }


    showInput(input) {

    }

    hideInput(modus) {

    }


    setTimers(mode: string) {
        //
        if (mode === 'on') {

            // end Edit Mode
            this.powerOnEdit = 0;

            // Set Default Sonoff Timer Values
            this.sonoffTimers[0].Arm = 1;
            this.sonoffTimers[0].Action = 1;
            this.sonoffTimers[0].Days = '1111111';
            this.sonoffTimers[0].Repeat = 1;
            this.sonoffTimers[0].Output = 1;
            this.setTimer(1, this.sonoffTimers[0]);
        }

        if (mode === 'off') {

            // end Edit Mode
            this.powerOffEdit = 0;

            // Set Default Sonoff Timer Values
            this.sonoffTimers[1].Arm = 1;
            this.sonoffTimers[1].Action = 0;
            this.sonoffTimers[1].Days = '1111111';
            this.sonoffTimers[1].Repeat = 1;
            this.sonoffTimers[1].Output = 1;
            this.setTimer(2, this.sonoffTimers[1]);
        }
    }


    public setTimer(timerNumber: number, data: SonoffTimer): void {
        const topic = 'cmnd/sonoffs/Timer' + timerNumber;
        const message = JSON.stringify(data);
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }


    public ngOnDestroy() {
        this.subscription_result.unsubscribe();

    }
}
