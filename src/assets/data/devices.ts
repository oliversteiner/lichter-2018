import {Device} from '../../app/_models/devices';


export const DEVICES: Device[] =
    [



        {
            name: 'Pergola',
            place: 'Pergola Vorne',
            timer: false,
            power: false,
            online: false,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-pergola-vorne',
            ip: '10.0.2.16',

        },


        {
            name: 'Stern Strasse / Pergola',
            place: 'Pergola hinten',
            timer: false,
            power: false,
            online: false,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-pergola-hinten',
            ip: '10.0.2.15',

        },

        {
            name: 'Stern und Laube',
            place: 'Aussentemperatur Eingang',
            timer: true,
            power: false,
            online: false,
            sensor: true,
            temperature: 0,
            humidity: 0,
            group: 'sonoffs',
            id: 'sonoff-stern-laube',
            ip: '10.0.2.14',
        },

        {
            name: 'Terrasse / Eckfenster',
            timer: false,
            power: false,
            online: false,
            sensor: false,
            group: 'sonoffs',
            id: 'sonoff-terrasse',
            ip: '10.0.2.13',

        },

        {
            name: 'Baum Sitzplatz',
            place: 'Ecke Magnolienbaum',
            timer: false,
            power: false,
            online: false,
            sensor: false,
            group: 'sonoffs',
            id: 'sonoff-magnolien-2',
            ip: '10.0.2.12',

        },
    ];
