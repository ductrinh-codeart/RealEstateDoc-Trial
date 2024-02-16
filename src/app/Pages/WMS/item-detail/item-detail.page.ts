import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CRM_BusinessPartnerProvider, WMS_ItemProvider } from 'src/app/Services/service/static/services.service';
import { EnvService } from 'src/app/Services/service/core/env.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage extends PageBase {

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

    canEdit: true,
    canAdd: true,
    sort: []
  }

  
  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public override env: EnvService,
    public override navCtrl: NavController,
    public override route: ActivatedRoute,
    public override cdr: ChangeDetectorRef,
    public override pageProvider: WMS_ItemProvider
  ) {
    super();
    this.item = {};
    this.pageConfig.isDetailPage = true;
    this.id = this.route.snapshot.paramMap.get('id');

    this.formGroup = formBuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      name: ['', Validators.required],
      code: ['', Validators.required],
      uom: ['', Validators.required],
      remark: new FormControl({ value: '', disabled: false }),
      instockquantity: new FormControl({ value: '', disabled: false }),
      commitedquantity: new FormControl({ value: '', disabled: false }),
      orderedquantity: new FormControl({ value: '', disabled: false }),
      price: new FormControl({ value: '', disabled: false }),
      createddate: new FormControl({ value: '', disabled: false }),
      modifieddate: new FormControl({ value: '', disabled: false }),
      isdeleted: new FormControl({ value: '', disabled: false })
    });
  }

  segmentView = 's1';
  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
  }

  UoMList = [
    {
      Id: 1,
      Name: "Piece",
      Code: "Piece",
    },
    {
      Id: 2,
      Name: "Box",
      Code: "Box",
    },
    {
      Id: 3,
      Name: "Carton",
      Code: "Carton",
    },
    {
      Id: 4,
      Name: "Pallet",
      Code: "Pallet",
    },
  ]

  saveData(ev:any) {
    this.saveChange(this.pageConfig.pageName);
  }

  refreshData() {
    this.refresh();
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
            this.selectedItems = [];
            this.selectedItems.push(this.item);
            this.deleteItems().finally(() => {
              setTimeout(() => {
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
