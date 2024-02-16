import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NavController } from "@ionic/angular";

@Component({
  template: '',
  providers: []
})
export abstract class PageBase implements OnInit {

  env: any;
  route: any;
  navCtrl: any;
  alertCtrl: any;
  popoverCtrl: any;
  pageProvider: any;
  modalController: any;
  loadingController: any;

  //Detail page
  id: any;
  cdr: any;
  formGroup: FormGroup | any;
  submitAttempt = false;

  item: any = {};
  items: any = [];
  selectedItems: any = [];

  localQuery: any = {};

  query: any = {
    Keyword: '',
    Take: 100,
    Skip: 0,
  }

  pageConfig: any = {
    pageCode: '',
    pageName: '',
    pageTitle: '',
    pageRemark: '',

    isDetailPage: false,
    sort: [],
  }

  ngOnInit() {
    let pageUrl = '';
    if (this.route && !this.pageConfig.pageCode) {
      this.pageConfig.pageCode = this.route.snapshot?.routeConfig?.component?.name;
      this.id = this.route.snapshot?.paramMap?.get('id');
      pageUrl = this.navCtrl.router.routerState.snapshot.url + '/';
    }
    else if (this.pageConfig.pageCode != 'help') {
      pageUrl = this.navCtrl.router.routerState.snapshot.url + '/';
    }
    else {
      pageUrl = this.pageConfig.pageCode + '/';
    }

    this.preLoadData();
  }

  //Data load
  preLoadData(event = null) {
    this.clearData();
    this.loadData(null);
  }

  clearData() {
    this.pageConfig.showSpinner = true;
    this.pageConfig.isEndOfData = false;
    this.query.Keyword = '';
    this.items = [];
  }

  loadData(event:any) {

    if (this.pageConfig.isDetailPage) {
      this.loadAnItem(event);
    }
    else {
      this.parseSort();

      if (this.pageProvider && !this.pageConfig.isEndOfData) {
        if (event == 'search') {
          this.pageProvider.read(this.query, this.pageConfig.forceLoadData).then((result: any) => {
            if (result.data.length == 0) {
              this.pageConfig.isEndOfData = true;
            }
            this.items = result.data;
            this.loadedData(null);
          });
        }
        else {
          this.query.Skip = this.items.length;
          this.pageProvider.read(this.query, this.pageConfig.forceLoadData).then((result: any) => {
            if (result.data.length == 0) {
              this.pageConfig.isEndOfData = true;
            }
            if (result.data.length > 0) {
              let firstRow = result.data[0];

              //Fix dupplicate rows
              if (this.items.findIndex((d: any) => d.id == firstRow.id) == -1) {
                this.items = [...this.items, ...result.data];
              }
            }

            this.loadedData(event);
          }).catch((err: any) => {
            if (err.message != null) {
              this.env.showMessage(err.message, 'danger');
            }
            else {
              this.env.showMessage('Cannot extract data', 'danger');
            }
            console.log(err);
            this.loadedData(event);
          });
        }

      }
      else {
        this.loadedData(event);
      }
    }
  }

  loadAnItem(event = null) {
    if (!isNaN(this.id)) {
      this.id = parseInt(this.id)
    }
    // this.id = parseInt(this.id) ?? this.id;


    if (this.id) {
      this.pageProvider.getAnItem(this.id, null).then((ite: any) => {
        this.item = ite;
        this.loadedData(event);
      }).catch((err: any) => {
        console.log(err);

        if (err.status = 404) {
          this.nav('not-found', 'back');
        }
        else {
          this.item = null;
          this.loadedData(event);
        }

      });
    }
    else if (this.id == 0) {
      if (!this.item) this.item = {};

      Object.assign(this.item, this.DefaultItem);
      this.loadedData(event);
    }
    else {
      this.loadedData(event);
    }
  }

  DefaultItem = { id: 0, IsDisabled: false };
  loadedData(event: any = null, ignoredFromGroup = false) {
    this.pageConfig.showSpinner = false;
    event?.target?.complete();

    if (this.pageConfig.isDetailPage) {
      if (this.item) {
        if (this.item.hasOwnProperty('isdeleted') && this.item.isdeleted)
          this.nav('not-found', 'back')
        this.formGroup?.patchValue(this.item);
        this.formGroup?.markAsPristine();
        this.cdr?.detectChanges();

        if (this.item.IsDisabled)
          this.pageConfig.canEdit = false;
      }

      if ((!this.item || this.id == 0) && this.pageConfig.canAdd) {
        if (!this.item)
          this.item = { id: 0, IsDisabled: false };
        else
          Object.assign(this.item, this.DefaultItem);

        this.pageConfig.canEdit = this.pageConfig.canAdd;
        // this.formGroup?.reset();
        // this.formGroup?.patchValue(this.item);
      }

      if (!(this.pageConfig.canEdit || (this.pageConfig.canAdd && this.item.id == 0 || ignoredFromGroup))) {
        this.formGroup?.disable();
      }

    }
  }

  nav(URL: any, direction = "forward", data = null) {
    event?.preventDefault();
    event?.stopPropagation();

    if (direction == "forward") {
      if (data) {
        this.navCtrl.navigateForward(URL, data);
      }
      else {
        this.navCtrl.navigateForward(URL);
      }
    }
    else if (direction == "back") {
      this.navCtrl.navigateBack(URL);
    }
    else {
      this.navCtrl.navigateRoot(URL);
    }
  }


  parseSort() {
    let sortTerms = this.pageConfig.sort.map((m: any) => m.Dimension + (m.Order == 'DESC' ? '_desc' : ''));
    if (sortTerms.length) {
      this.query.SortBy = '[' + sortTerms.join(',') + ']';
    }
  }

  add() {
    let newItem = {
      id: 0,
    };
    this.showItem(newItem);
  }

  showItem(i: any) {
    this.navCtrl.navigateForward('/' + this.pageConfig.pageCode + '/' + i.id);
  }

  refresh(event = null) {
    this.selectedItems = [];
    if (!this.pageConfig.showSpinner) {
      this.clearData();
      this.loadData(event);
    }
  }

  //Datatable funcions
  sort: any = {};
  sortToggle(field: any, stop = false, sort = this.sort, query = this.query) {
    if (!sort[field]) {
      sort[field] = field
    } else if (sort[field] == field) {
      sort[field] = '-'+field
    }
    else {
      delete sort[field];
    }

    let sortTerms = sort;

    let s = Object.keys(sortTerms).reduce(function (res, v) {
      return res.concat(sortTerms[v]);
    }, []);

    if (s.length) {
      query.SortBy = '_sort=' + s.join(',');
    }
    else {
      delete query.SortBy;
    }
    if (!stop) {
      this.refresh();
    }
  }

  unselect() {
    this.selectedItems.forEach((s: any) => {
      s.checked = false;
    });
    this.selectedItems = [];
  }

  lastchecked: any = null;
  changeSelection(i: any, e: any = null) {
    if (e && e.shiftKey) {
      let from = this.items.indexOf(this.lastchecked);
      let to = this.items.indexOf(i);

      let start = Math.min(from, to);
      let end = Math.max(from, to) + 1;

      let itemsToCheck = this.items.slice(start, end);
      for (let j = 0; j < itemsToCheck.length; j++) {
        const it = itemsToCheck[j];


        it.checked = this.lastchecked.checked;
        const index = this.selectedItems.indexOf(it, 0);

        if (this.lastchecked.checked && index == -1) {
          this.selectedItems.push(it);
        }
        else if (!this.lastchecked.checked && index > -1) {
          this.selectedItems.splice(index, 1);
        }

      }

    }
    else if (e) {
      if (e.target.checked) {
        this.selectedItems.push(i);
      }
      else {
        const index = this.selectedItems.indexOf(i, 0);
        if (index > -1) {
          this.selectedItems.splice(index, 1);
        }
      }
    }
    else {
      if (i.checked) {
        this.selectedItems.push(i);
      }
      else {
        const index = this.selectedItems.indexOf(i, 0);
        if (index > -1) {
          this.selectedItems.splice(index, 1);
        }
      }
    }

    this.selectedItems = [...this.selectedItems];
    this.lastchecked = i;

    //e?.preventDefault();
    e?.stopPropagation();
  }

  async deleteItems() {
    this.pageProvider.delete(this.selectedItems).finally((result: any) => {
      if (this.pageConfig.isDetailPage) {
        this.navCtrl.navigateBack(this.pageConfig.pageCode);
      }
    });
  }

  saveChange(publishEventCode = this.pageConfig.pageName) {
    return new Promise((resolve, reject) => {
        this.formGroup.updateValueAndValidity();

        if (!this.formGroup.valid) {
            this.env.showMessage('Please recheck information highlighted in red above','warning');
            console.log('Please recheck information highlighted in red above')
        }
        else if (this.submitAttempt == false) {
            this.submitAttempt = true;
            //lib.copyPropertiesValue(this.formGroup.value, this.item);
            this.item = this.formGroup.value;
            this.item.id = this.id;
            Object.assign(this.item, this.formGroup.value);
            Object.keys(this.item).forEach(k => {
                if (this.item[k] === null || this.item[k] === undefined || this.item[k] === '')
                    delete this.item[k];

            });
            if (!this.item.hasOwnProperty('id')) {
                this.item.id = 0;
            }

            // this.loadingController.create({
            //     cssClass: 'my-custom-class',
            //     message: 'Đang lưu dữ liệu...'
            // }).then(loading => {
            //     loading.present();

            this.pageProvider.save(this.item, this.pageConfig.isForceCreate).then((savedItem: any) => {
                if (publishEventCode) {
                    // this.env.publishEvent({ Code: publishEventCode });
                    console.log('saveChange', publishEventCode);
                }

                if (this.item.id != savedItem.id) {
                    this.item.id = savedItem.id;
                    this.id = savedItem.id;
                    this.loadedData();
                    if (window.location.href.endsWith('/0')) {
                        let newURL = window.location.href.substring(0, window.location.href.length - 1) + savedItem.id;
                        history.pushState({}, '', newURL);
                    }

                }

                // if (loading) loading.dismiss();
                this.env.showMessage('Import completed!','success');
                this.formGroup.markAsPristine();
                this.cdr.detectChanges();
                resolve(savedItem.id);
                this.submitAttempt = false;
                this.savedChange(savedItem);
            }).catch((err:any) => {
                // if (loading) loading.dismiss();
                this.env.showMessage('Cannot save, please try again','danger');
                this.cdr.detectChanges();
                this.submitAttempt = false;
                reject(err);
            });
            // });
        }
    });
}

  savedChange(savedItem: any = null, form = this.formGroup) {
    if (savedItem) {
      if (form.controls.id && savedItem.id && form.controls.id.value != savedItem.id)
        form.controls.id.setValue(savedItem.id);

      if (this.pageConfig.isDetailPage && form == this.formGroup && this.id == 0) {
        this.item = savedItem;
        this.id = savedItem.id;
        if (window.location.href.endsWith('/0')) {
          let newURL = window.location.href.substring(0, window.location.href.length - 1) + savedItem.id;
          history.pushState({}, '', newURL);
        }
      }
    }

    form.markAsPristine();
    this.cdr.detectChanges();
    this.submitAttempt = false;
    this.env.showMessage('Saving completed!', 'success');
  }

  alwaysReturnProps = ['id'];
  getDirtyValues(fg: any) {
    if (!fg.valid)
      return;

    let dirtyValues:any = {};  // initialize empty object
    Object.keys(fg.controls).forEach((c) => {
      if (c.indexOf('_') != 0) {
        let currentControl = fg.controls[c];
        if (currentControl.dirty || this.alwaysReturnProps.indexOf(c) > -1) {
          if (currentControl.controls) //check for nested controlGroups

          dirtyValues[c] = this.getDirtyValues(currentControl);  //recursion for nested controlGroups
          else
            dirtyValues[c] = currentControl.value;  //simple control
        }
      }
    });
    return dirtyValues;
  }

}
