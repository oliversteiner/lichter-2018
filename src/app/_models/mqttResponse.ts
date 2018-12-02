import {AM2301Sensor} from './AM2301Sensor';
import {SonoffTimer} from './sonoffTimer';


export interface MqttResponse {

    Time: string;
    AM2301: AM2301Sensor;
    Timer1: SonoffTimer;
}