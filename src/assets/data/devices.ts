import {Device} from '../../app/_models/devices';


export const DEVICES: Device[] =
    [

        {
            name: 'Stern und Laube',
            timer: true,
            power: false,
            online: false,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-stern-laube'
        },

        {
            name: 'Stern Strasse',
            timer: false,
            power: false,
            online: false,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-stern-strasse'
        },

        {
            name: 'Pergula',
            timer: false,
            power: false,
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
            power: false,
            online: false,
            sensor: false,
            group: 'sonoffs',
            id: 'sonoff-gaestezimmer'
        },

        {
            name: 'Terrasse',
            timer: false,
            power: false,
            online: false,
            sensor: false,
            group: 'sonoffs',
            id: 'sonoff-terrasse'
        },
        {
            name: 'Test',
            place: 'Wohnzimmer Oli',
            timer: false,
            power: false,
            online: false,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff'
        },
    ];
