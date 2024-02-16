import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
/**
 * This service allows manipulation of environment variables
 * @class EnvService
 */
export class EnvService {

    /** Last message was shown */
    lastMessage = '';


    constructor(
        public plt: Platform,
        public toastController: ToastController,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
    ) {
    }

    /**
     * Show the message to end-user. Ignored if message equal to the last message in 5 seconds
     * @param message The message to show
     * @param color The color of message
     * @param duration The time (ms) to show message
     * @param showCloseButton Show a close button instead of turning itself off (use alert instead of toast)
     */
    showMessage(message:string, color = 'warning', duration = 5000, showCloseButton = false) {
        if (this.lastMessage == message) return;
        this.lastMessage = message;

        setTimeout(() => {
            this.lastMessage = '';
        }, 5000);

        if (!showCloseButton) {
            this.toastController.create({
                message: message,
                color: color,
                duration: duration,
                buttons: [showCloseButton ? { text: 'Close', role: 'close' } : {}]
            }).then(toast => {
                toast.present();
            });
        }
        else {
            this.alertCtrl.create({
                //header: 'DMS',
                //subHeader: '---',
                message: message,
                buttons: [
                    // {
                    //     text: 'Không',
                    //     role: 'cancel',
                    //     handler: () => {
                    //         //console.log('Không xóa');
                    //     }
                    // },
                    {
                        text: 'OK',
                        cssClass: 'danger-btn',
                        handler: () => { }
                    }
                ]
            }).then(alert => {
                alert.present();
            })
        }
    }


}