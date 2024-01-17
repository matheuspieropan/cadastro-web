import { Injectable } from '@angular/core';

import { Proposta } from '../model/proposta';
import { WebSocketConnector } from './web-socket-connector';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    constructor() {
        new WebSocketConnector(
            '', '/propostas', this.onMessage.bind(this)
        );
    }

    onMessage(propostas: Proposta[]): void {
        console.log(propostas)
    }
}