import {environment} from 'src/environments/environment';


export var ApiSetting = {
	//Review API URL
	mainService: {
		base: environment.appDomain,
	},
	apiDomain: function (api:any) {
		return this.mainService.base + api;
	}
}
