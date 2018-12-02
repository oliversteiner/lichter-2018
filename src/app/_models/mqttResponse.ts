import {AM2301Sensor} from './AM2301Sensor';
import {SonoffTimer} from './sonoffTimer';


export interface MqttResponse {
    Timers: string;

    Time: string;
    AM2301: AM2301Sensor;
    Timer1: SonoffTimer;
    Timer2: SonoffTimer;
    Timer3: SonoffTimer;
    Timer4: SonoffTimer;
    Timer5: SonoffTimer;
    Timer6: SonoffTimer;
    Timer7: SonoffTimer;
    Timer8: SonoffTimer;
    Timer9: SonoffTimer;
    Timer10: SonoffTimer;
    Timer11: SonoffTimer;
    Timer12: SonoffTimer;
    Timer13: SonoffTimer;
    Timer14: SonoffTimer;
    Timer15: SonoffTimer;
    Timer16: SonoffTimer;
    Timers1: {
        Timer1: SonoffTimer;
        Timer2: SonoffTimer;
        Timer3: SonoffTimer;
        Timer4: SonoffTimer;
    };
}