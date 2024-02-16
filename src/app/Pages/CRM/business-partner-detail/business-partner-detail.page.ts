import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CRM_BusinessPartnerProvider } from 'src/app/Services/service/static/services.service';
import { EnvService } from 'src/app/Services/service/core/env.service';

@Component({
  selector: 'app-business-partner-detail',
  templateUrl: './business-partner-detail.page.html',
  styleUrls: ['./business-partner-detail.page.scss'],
})
export class BusinessPartnerDetailPage extends PageBase {

  override pageConfig = {
    pageCode: 'business-partner',
    pageName: 'Business Partner',
    pageTitle: 'Business Partner',
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
    public override pageProvider: CRM_BusinessPartnerProvider
  ) {
    super();
    this.item = {};
    this.pageConfig.isDetailPage = true;
    this.id = this.route.snapshot.paramMap.get('id');

    this.formGroup = formBuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      fullname: new FormControl({ value: '', disabled: false }),
      code: [''],
      phonenumber: new FormControl({ value: '', disabled: false }),
      remark: new FormControl({ value: '', disabled: false }),
      isvendor: new FormControl({ value: true, disabled: false }),
      iscustomer: new FormControl({ value: true, disabled: false }),
      isstaff: new FormControl({ value: true, disabled: false }),
      createddate: new FormControl({ value: '', disabled: false }),
      modifieddate: new FormControl({ value: '', disabled: false }),
      isdeleted: new FormControl({ value: '', disabled: false })
    });
  }


  segmentView = 's1';
  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
  }

  CodeList = [
    {
      Id: 1,
      Name: "Ha Noi",
      Code: "HN",
    },
    {
      Id: 2,
      Name: "Da Nang",
      Code: "DN",
    },
    {
      Id: 3,
      Name: "Ho Chi Minh",
      Code: "HCM",
    },
  ]

  saveData(ev:any) {
    this.formGroup.controls.fullname.setValue(this.formGroup.controls.firstname.value + ' ' + this.formGroup.controls.lastname.value);
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
