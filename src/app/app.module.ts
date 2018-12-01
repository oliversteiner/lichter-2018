import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SandboxComponent} from './sandbox/sandbox.component';
import {MqttSandboxComponent} from './mqtt-sandbox/mqtt-sandbox.component';
import {FormsModule} from '@angular/forms';

import {
    IMqttMessage,
    MqttModule,
    IMqttServiceOptions
} from 'ngx-mqtt';
import { LichtComponent } from './licht/licht.component';
import { TimerComponent } from './timer/timer.component';
import { SensorenComponent } from './sensoren/sensoren.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    clientId: 'lichter-2018-b',
    connectTimeout: 5000,
    hostname: '10.0.1.11',
    port: 8083,
    path: '/mqtt',
    username: 'test',
    password: 'test'
};


@NgModule({
    declarations: [
        AppComponent,
        SandboxComponent,
        MqttSandboxComponent,
        LichtComponent,
        TimerComponent,
        SensorenComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS),


    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
