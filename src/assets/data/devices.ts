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
            name: 'Stern Strasse / Pergola',
            place: 'Pergola',
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
            name: 'Baum Sitzplatz',
            place: 'Ecke Magnolienbaum',
            timer: false,
            power: false,
            online: false,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-magnolien'
        },

        {
            name: 'Test',
            place: 'Wohnzimmer Oli',
            timer: false,
            power: false,
            online: false,
            sensor: false,
            group: 'sonoffs',
            id: 'sonoff-test'
        },

        {
            name: 'Terrasse / Eckfenster',
            timer: false,
            power: false,
            online: false,
            sensor: false,
            group: 'sonoffs',
            id: 'sonoff-terrasse'
        },

    ];
