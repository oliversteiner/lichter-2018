export interface Device {
    name: string;
    timer: string;
    status: string;
    sensor: string;

}

export class Device {
    constructor(
        public name: string,
        public timer: string,
        public status: string,
        public sensor: string,
    ) {
        this.name = 'name';
        this.timer = 'timer';
        this.status = 'status';
        this.sensor = 'sensor';
    }

}

