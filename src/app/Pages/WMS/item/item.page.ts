import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { EnvService } from 'src/app/Services/service/core/env.service';
import { WMS_ItemProvider } from 'src/app/Services/service/static/services.service';
import { PageBase } from 'src/app/page-base';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage extends PageBase {

  override pageConfig = {
    pageCode: 'item',
    pageName: 'Item',
    pageTitle: 'Item',
    pageRemark: '',
    pageIcon: 'star',
    pageColor: 'primary',

    isDetailPage: false,
    isShowMore: false,
    isShowSearch: false,
    isShowCheck: false,
    isShowFeature: false,
    infiniteScroll: true,
    forceLoadData: true,
    refresher: true,
    showSpinner: true,
    isEndOfData: false,
    didEnter: false,
    isMainPageActive: true,

    sort: []

  }

  constructor(
    public override navCtrl: NavController,
    public alertController: AlertController,
    public override env: EnvService,
    public override pageProvider: WMS_ItemProvider
  ) {
    super();
  }

  handlerMessage = '';
  roleMessage = '';
  async deleteData() {
    const alert = await this.alertController.create({
      header: 'Do you confirm to delete data?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Cancel';
          },
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Confirm!';
            this.deleteItems().finally(() => {
              setTimeout(() => {
                this.unselect();
                this.refresh();
              }, 2000);
            });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
}
