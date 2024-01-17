import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

export class WebSocketConnector {

    private stompClient: any;

    constructor(private webSocketEndPoint: string, private topic: string, private onMessage: Function, private callbackError?: Function) {
        const errorCallback = callbackError || this.onError;
        this.connect(errorCallback);
    }

    private connect(errorCallback: Function) {
        const ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, (frame: any) => {
            this.stompClient.subscribe(this.topic, (event: any) => {
                this.onMessage(event);
            });
        }, errorCallback.bind(this));
    };

    private onError(error: string) {
        setTimeout(() => { this.connect(this.onError) }, 3000);
    }
}