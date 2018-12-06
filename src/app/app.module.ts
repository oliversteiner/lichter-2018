import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SandboxComponent} from './sandbox/sandbox.component';
import {MqttSandboxComponent} from './mqtt-sandbox/mqtt-sandbox.component';
import {FormsModule} from '@angular/forms';

import {
    MqttModule,
    IMqttServiceOptions
} from 'ngx-mqtt';
import {LichterComponent} from './lichter/lichter.component';
import {TimerComponent} from './timer/timer.component';
import {SensorenComponent} from './sensoren/sensoren.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {NavigationComponent} from './navigation/navigation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {


    // Dev
    clientId: 'lichter-2018',
    connectTimeout: 5000,
    hostname: '10.0.1.11',
    port: 8083,
    path: '/mqtt',
    username: 'schlossnet',
    password: 'schloss#28975-IUZ',

    // Prod
    // clientId: 'lichter-2018',
    // connectTimeout: 500// hostname: 'iot-server.local',
    // port: 8083,
    // path: '/mqtt',
    // username: 'schlossnet',
    // password: 'schloss#28975-IUZ',


};

//
@NgModule({
    declarations: [
        AppComponent,
        SandboxComponent,
        MqttSandboxComponent,
        LichterComponent,
        TimerComponent,
        SensorenComponent,
        FooterComponent,
        HeaderComponent,
        NavigationComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
        FontAwesomeModule,


    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
