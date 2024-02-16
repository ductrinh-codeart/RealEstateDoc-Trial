import { ApiSetting } from "./static/api-setting"



export var APIListBase = {
    CRM_BusinessPartner:{
        getList:{
            method: "GET",
            url: function(){return ApiSetting.apiDomain("CRM_BusinessPartner?isdeleted=0")}  
        },
        getItem:{
            method: "GET",
            url: function(id:number){return ApiSetting.apiDomain("CRM_BusinessPartner/") + id} 
        },
        postItem:{
            method: "POST",
            url: function(){return ApiSetting.apiDomain("CRM_BusinessPartner")}
        },
        putItem:{
            method: "PUT",
            url: function(id:number){return ApiSetting.apiDomain("CRM_BusinessPartner/") + id} 
        },
        delItem:{
            method: "PUT",
            url: function(id:number){return ApiSetting.apiDomain("CRM_BusinessPartner/") + id} 
        }
	},

    WMS_Item:{
        getList:{
            method: "GET",
            url: function(){return ApiSetting.apiDomain("WMS_Item?isdeleted=0")}  
        },
        getItem:{
            method: "GET",
            url: function(id:number){return ApiSetting.apiDomain("WMS_Item/") + id} 
        },
        postItem:{
            method: "POST",
            url: function(){return ApiSetting.apiDomain("WMS_Item")}
        },
        putItem:{
            method: "PUT",
            url: function(id:number){return ApiSetting.apiDomain("WMS_Item/") + id} 
        },
        delItem:{
            method: "PUT",
            url: function(id:number){return ApiSetting.apiDomain("WMS_Item/") + id} 
        }
	},
}