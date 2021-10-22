export class Sender {
    private session: any;
    private applicationId: string;
    private namespace: string;

    constructor(applicationId: string, namespace: string) {
        this.applicationId = applicationId;
        this.namespace = namespace;
    }

    initialize(): boolean {
        console.log("initializing...");

        let sessionRequest = new chrome.cast.SessionRequest(this.applicationId);
        let apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionListener, this.receiverListener);
        chrome.cast.initialize(apiConfig, this.initializeSuccess, this.initializeFail);

        return this.session && true;
    }

    sendMessage(payload: any) {
        if(this.session) {
            this.session.sendMessage(this.namespace, payload, () => {
                console.log("Message sent successfully!");
            }, (error) => {
                console.log("Message send not successful", error);
            });
        }
    }

    private initializeSuccess() {
        console.log("initialize succeded");
    }

    private initializeFail(error) {
        console.log("initialize failed", error);
    }

    private sessionListener(session) {
        console.log("session listener", session);
    }

    private receiverListener = (e) => {
        console.log("receiver listener", e);

        if(e === chrome.cast.ReceiverAvailability.AVAILABLE) {
            console.log("selecting device");
            chrome.cast.requestSession(this.selectDeviceSuccess, this.selectDeviceFail);
        }
    }

    private selectDeviceSuccess = (e) => {
        console.log("selecting device", e);
        this.session = e;
    }

    private selectDeviceFail(error) {
        console.log("select device failed", error);
    }
}