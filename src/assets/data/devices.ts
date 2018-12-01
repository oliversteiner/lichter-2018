import {Device} from '../../app/_models/devices';


export const DEVICES: Device[] =
    [
        {
            name: 'Stern und Laube',
            timer: true,
            power: false,
            online: true,
            sensor: true,
            temperature: 3,
            humidity: 20,
            mqtt_group: 'sonoffs',
            mqtt_name: 'sonoff-stern-laube'
        },
        {
            name: 'Stern Strasse',
            timer: true,
            power: true,
            online: true,
            sensor: false,
            temperature: 0,
            humidity: 0,
            mqtt_group: 'sonoffs',
            mqtt_name: 'sonoff-stern-strasse'
        },
        {
            name: 'Pergula',
            timer: false,
            power: true,
            online: false,
            sensor: true,
            temperature: 12,
            humidity: 35,
            mqtt_group: 'sonoffs',
            mqtt_name: 'sonoff-pergula'
        },
        {
            name: 'Gästezimmer',
            timer: false,
            power: true,
            online: false,
            sensor: false,
            mqtt_group: 'sonoffs',
            mqtt_name: 'sonoff-gaestezimmer'
        },
        {
            name: 'Terasse',
            timer: false,
            power: true,
            online: false,
            sensor: false,
            mqtt_group: 'sonoffs',
            mqtt_name: 'sonoff-terasse'
        }
    ];
