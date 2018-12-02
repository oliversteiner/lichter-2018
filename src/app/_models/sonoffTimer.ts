// https://github.com/arendst/Sonoff-Tasmota/wiki/Commands#timers

export interface SonoffTimer {
    Arm: number;    // 1 | 0
    Mode: number;   // 1 | 0
    Time: string;   // 	hh:mm
    Window: number; // 0 .. 15
    Days: string;   // "1111111" (SMTWTFS)
    Repeat: number;   // 1 | 0
    Output: number; // 1 .. 16
    Action: any;    // 0 | 1 | 2 | 3
}

