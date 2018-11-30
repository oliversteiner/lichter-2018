import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SandboxComponent} from './sandbox/sandbox.component';
import {MqttSandboxComponent} from './mqtt-sandbox/mqtt-sandbox.component';

const routes: Routes = [
    {
        path: 'sandbox', component: SandboxComponent
    },
    {
        path: 'mqtt-sandbox', component: MqttSandboxComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
