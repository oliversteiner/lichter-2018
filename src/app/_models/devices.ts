

export interface Device {
    sensorIcon?: string;
    powerIcon?: string;
    timerIcon?: string;
    name: string;
    timer: boolean;
    power: boolean;
    online: boolean;
    sensor: boolean;
    temperature?: number;
    humidity?: number;
    mqtt_group?: string;
    mqtt_name?: string;

    // helper
    sensorDetails?: boolean;
}

export class Device {



    constructor(
        public name: string,
        public timer: boolean,
        public power: boolean,
        public online: boolean,
        public sensor: boolean,
        public temperature?: number,
        public humidity?: number,
    ) {
        this.name = 'Device Name';
        this.timer = false;
        this.power = false;
        this.online = false;
        this.sensor = false;
    }

}

























