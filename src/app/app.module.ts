import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { MqttSandboxComponent } from './mqtt-sandbox/mqtt-sandbox.component';
import { Observable } from 'rxjs';

import {
    IMqttMessage,
    MqttModule,
    IMqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    clientId: 'lichter-2018',
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
    MqttSandboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
