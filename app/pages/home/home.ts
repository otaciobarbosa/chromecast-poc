import {Page, Platform} from 'ionic-angular';
import {Sender} from '../../services/Sender';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    private applicationId : string = "A5ED5A75";
    private namespace: string = "urn:x-cast:com.angular2.chromecast.receiver.starterkit";
    private sender: Sender;
    private connected: boolean = false;

    constructor(private platform:Platform) {
        this.sender = new Sender(this.applicationId, this.namespace);
    }

    attemptInitialize() {
        this.platform.ready().then(() => {
            this. connected = this.sender.initialize();
        });
    }

    sendNavigateMessage (pageName) {
        let payload = {command: 'nav', page: pageName};

        if(pageName === "Page1") {
            payload.message = "whoa it works...";
        }

        console.log("sending navigation message", JSON.stringify(payload));
        this.sender.sendMessage(payload);
    }


}
