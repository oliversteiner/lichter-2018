import {Device} from '../../app/_models/devices';


export const DEVICES: Device[] =
    [
        {
            name: 'Test',
            place: 'Wohnzimmer Oli',
            timer: true,
            power: false,
            online: true,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff'
        },
        {
            name: 'Stern und Laube',
            timer: true,
            power: false,
            online: true,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-stern-laube'
        },

        {
            name: 'Stern Strasse',
            timer: true,
            power: true,
            online: true,
            sensor: false,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-stern-strasse'
        },

        {
            name: 'Pergula',
            timer: false,
            power: true,
            online: false,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-pergula'
        },

        {
            name: 'Gästezimmer',
            timer: false,
            power: true,
            online: false,
            sensor: false,
            group: 'sonoffs',
            id: 'sonoff-gaestezimmer'
        },

        {
            name: 'Terasse',
            timer: false,
            power: true,
            online: false,
            sensor: false,
            group: 'sonoffs',
            id: 'sonoff-terasse'
        }
    ];
