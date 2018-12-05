import {Component, OnDestroy, OnInit} from '@angular/core';
import {SonoffTimer} from '../_models/sonoffTimer';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import {MqttResponse} from '../_models/mqttResponse';
import {Device} from '../_models/devices';
import {DEVICES} from '../../assets/data/devices';
import {ConfigService} from '../_services/config.service';
// Icons
import {faChevronUp, faChevronDown, faCheck, faTimes} from '@fortawesome/pro-light-svg-icons';

interface Timer {
    timerOn: {
        h: number,
        m: number
    };
    timerOff: {
        h: number,
        m: number
    };
}

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

    // General
    title = 'Timer';
    id = 'timer';
    debug = false;
    edit = false;

    timerStatus: string;
    subscription_result: Subscription;
    result: string;
    sonoffTimers: SonoffTimer[];
    globalTimerArm: number;

    // icons
    iconStepUp = faChevronUp;
    iconStepDown = faChevronDown;
    iconSave = faCheck;
    iconCancel = faTimes;

    // timer
    timer: Timer;


    // Devices from Data
    private devices: Device[] = DEVICES;

    constructor(private _mqttService: MqttService, private _config: ConfigService) {

        // Debug
        this.debug = this._config.debug;

        // Navigation
        this._config.setActivePage(this.id);

        // Devices
        this.sonoffTimers = [];

        this.sonoffTimers[0] = new SonoffTimer();
        this.sonoffTimers[1] = new SonoffTimer();
        this.globalTimerArm = 0;

        // Timer
        this.timer = {
            timerOn: {
                h: 0,
                m: 0,
            },
            timerOff: {
                h: 0,
                m: 0,
            }
        };

        for (const device of this.devices) {

            // get Timer1

            // Result Response
            this.subscription_result = this._mqttService.observe('stat/' + device.id + '/RESULT')
                .subscribe((message: IMqttMessage) => {

                    this.result = message.payload.toString();
                    // console.log('result', this.result);

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

    ngOnInit() {

        // Navigation
        this._config.setActivePage(this.id);

    }

    checkTimerStatus() {
        // console.log('this.timerStatus', this.timerStatus);

        this.timerStatus = 'Timer aus';

        // Check status
        if (this.globalTimerArm) {
            this.timerStatus = 'Timer an';
        }

        this.loadTimer();


    }


    toggleTimer() {

        this._config.setActivePage(this.id);

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



    loadTimer() {

        // Timer On
        const arrOn = this.sonoffTimers[0].Time.split(':');
        this.timer.timerOn.h = Number(arrOn[0]);
        this.timer.timerOn.m = Number(arrOn[1]);

        // Timer Off
        const arrOff = this.sonoffTimers[1].Time.split(':');
        this.timer.timerOff.h = Number(arrOff[0]);
        this.timer.timerOff.m = Number(arrOff[1]);
    }

    buildSonoffTimers() {

        // Set Default Sonoff Timer Values
        this.sonoffTimers[0].Arm = 1;
        this.sonoffTimers[0].Action = 1;
        this.sonoffTimers[0].Days = '1111111';
        this.sonoffTimers[0].Repeat = 1;
        this.sonoffTimers[0].Output = 1;
        this.publishSonoffTimers(1, this.sonoffTimers[0]);


        // Set Default Sonoff Timer Values
        this.sonoffTimers[1].Arm = 1;
        this.sonoffTimers[1].Action = 0;
        this.sonoffTimers[1].Days = '1111111';
        this.sonoffTimers[1].Repeat = 1;
        this.sonoffTimers[1].Output = 1;
        this.publishSonoffTimers(2, this.sonoffTimers[1]);

    }


    publishSonoffTimers(timerNumber: number, data: SonoffTimer): void {
        const topic = 'cmnd/sonoffs/Timer' + timerNumber;
        const message = JSON.stringify(data);
        this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});

    }


    ngOnDestroy() {
        this.subscription_result.unsubscribe();

    }

    stepUpHours(timer: string) {

        this.edit = true;

        let number = this.timer[timer].h;

        // Step up Hours 0...23
        if (number >= 23) {
            number = 0;
        } else {
            number++;
        }

        this.timer[timer].h = number;
    }

    stepUpMinutes(timer: string) {

        this.edit = true;

        let number = this.timer[timer].m;

        // Step up Minutes 0...59
        if (number >= 59) {
            number = 0;
        } else {
            number++;
        }

        this.timer[timer].m = number;
    }

    stepDownHours(timer: string) {

        this.edit = true;

        let number = this.timer[timer].h;

        // Step down Hours 0...23
        if (number <= 0) {
            number = 23;
        } else {
            number--;
        }

        this.timer[timer].h = number;
    }

    stepDownMinutes(timer: string) {

        this.edit = true;

        let number = this.timer[timer].m;

        // Step down Minutes 0...59
        if (number <= 0) {
            number = 59;
        } else {
            number--;
        }

        this.timer[timer].m = number;
    }

    cancel() {

        this.edit = false;

        this.getTimerStatus();

    }

    save() {

        this.edit = false;

        // Timer On
        this.sonoffTimers[0].Time = this.timer.timerOn.h + ':' + this.timer.timerOn.m;

        // Timer Off
        this.sonoffTimers[1].Time = this.timer.timerOff.h + ':' + this.timer.timerOff.m;

        this.buildSonoffTimers();
    }
}
