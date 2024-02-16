import { Injectable } from '@angular/core';
import { APIList } from './global-variable';
import { CommonService, exService } from '../core/common.service';
import { SearchConfig } from './search-config';

@Injectable({ providedIn: 'root' })
export class SALE_SaleOrderProvider extends exService {
	constructor(public override commonService: CommonService) {
		super(APIList.SALE_SaleOrder, SearchConfig.getSearchFields('SALE_SaleOrder'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class CRM_BusinessPartnerProvider extends exService {
	constructor(public override commonService: CommonService) {
		super(APIList.CRM_BusinessPartner, SearchConfig.getSearchFields('CRM_BusinessPartner'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_ItemProvider extends exService {
	constructor(public override commonService: CommonService) {
		super(APIList.WMS_Item, SearchConfig.getSearchFields('WMS_Item'), commonService);
	}
}

@Injectable({ providedIn: 'root' })
export class WMS_UoMProvider extends exService {
	constructor(public override commonService: CommonService) {
		super(APIList.WMS_UoM, SearchConfig.getSearchFields('WMS_UoM'), commonService);
	}
}