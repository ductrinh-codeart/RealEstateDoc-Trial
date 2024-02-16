import { APIListBase } from '../api-list';
import { ApiSetting } from './api-setting';



export var APIList: any = APIListBase;

//ADD Customized APIHere
APIList.FILE_Import = {
    NhanSu: {
        method: "GET",
        url: function () { return ApiSetting.apiDomain("CUS/FILE/NhanSu") }
    },
};


export var GlobalData: any = {
    Filter: {
        FromDate: (new Date()).setDate(1),
        ToDate: new Date(),
        IDBranch: null,
    },
    IsCordova: true,
    Token: {
        access_token: "",
        expires_in: 0,
        token_type: "",
        refresh_token: ""
    },
    WebData: {
        menu: [],
        pinPost: []
    },
    UserData: {
        MenuItem: [],
        Setting: {
            tablePageSize: 30,
            ToastMessageDelay: 5000,
        },
    },
    Version: ''
};