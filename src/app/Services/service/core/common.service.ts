import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(public http: HttpClient) {

	}

	connect(pmethod:any, URL:any, data:any) {
		let headers = new HttpHeaders({
			// 'Authorization': this.getToken(),
			'Content-Type': 'application/json',
			'Data-type': 'json',
			//'withCredentials': 'true'
		});
		let options: any = {
			headers: headers,
			params: null
		};

		if (data && !data?.createddate) {
			data.createddate = new Date().toISOString().split('T')[0];
		}
		if (data && !data?.modifieddate) {
			data.modifieddate = new Date().toISOString().split('T')[0];
		}
		if (data && !data?.isdeleted) {
			data.isdeleted = false;
		}

		if (data && pmethod != 'UPLOAD') {
			data = JSON.parse(JSON.stringify(data));
		}
		if (data && (pmethod != 'POST' || pmethod != 'GET')) {
			data.modifieddate = new Date().toISOString().split('T')[0];
		}

        if (pmethod == "GET") {
			if (data) {
				let params: HttpParams = new HttpParams();
				for (const key of Object.keys(data)) {
					//if (data[key]) {
						if (data[key] && data[key] instanceof Array) {
							params = params.append(key.toString(), JSON.stringify(data[key]));
						} else {
							params = params.append(key.toString(), data[key]);
						}
					//}
				}
				options.params = params;
			}
			if (data?.SortBy) {
				return this.http.get(URL + '&' + data?.SortBy);
			}
			else {return this.http.get(URL)}
		}
		else if (pmethod == "POST") {
			return this.http.post(URL, JSON.stringify(data));

		}
		else if (pmethod == "PUT") {
			return this.http.put(URL, data);
		}
		else if (pmethod == "DELETE") {
			return this.http.delete(URL);
		}
		else {
			options.params = data;
			return this.http.get(URL);
		}
	}

	getAnItemOnServer(id: number, UID: string = '', apiPath:any) {
		let that = this;
		return new Promise(function (resolve, reject) {
			that.connect(apiPath.method, apiPath.url(id), null).toPromise()
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					that.checkError(err);
					reject(err);
					//return Promise.reject(err.message || err);
				});
		});
	}

	save(item:any, apiPath:any, isForceCreate = false) {
		if (item.id) {
			return this.update(item, apiPath.putItem, isForceCreate);
		}
		else {
			return this.add(item, apiPath.postItem);
		}
	}

	add(item:any, apiPath:any) {
		return new Promise((resolve, reject) => {
			delete item.id;
			this.connect(apiPath.method, apiPath.url(), item).toPromise()
				.then((data) => {
					resolve(data);
				}).catch(err => {
					this.checkError(err);
					reject(err);
				})
		});
	}

	update(item:any, apiPath:any, isForceCreate = false) {
		return new Promise((resolve, reject) => {
			this.connect(apiPath.method, apiPath.url(item.id) + (isForceCreate ? '?ForceCreate' : ''), item).toPromise()
				.then((data) => {
					resolve(data ? data : item);
				}).catch(err => {
					this.checkError(err);
					reject(err);
				})
		});
	}

	delete(items:any, apiPath:any) {
		return new Promise((resolve, reject) => {
			if (items) {
				let Ids = '';
				if (Array.isArray(items)) {
					items.forEach(item => {
						item.isdeleted = true;
					});
				}
				else {
					items.isdeleted = true;
					Ids = `[${items.id}]`;
				}
				items.forEach((item:any) => {
					this.connect(apiPath.delItem.method, apiPath.delItem.url(item.id), item).toPromise()
					.then(() => {
						resolve(true);
					}).catch(err => {
						this.checkError(err);
						reject(err);
					})
				});
			}
			else {
				reject('It looks like there is nothings to delete!')
			}
		});
	}

	post(URL:any, data:any) {
		return new Promise((resolve, reject) => {
			this.connect('POST', URL, data).toPromise().then(resp => {
				resolve(resp);
			}).catch(err => {
				this.checkError(err);
				reject(err);
			})
		});
	}

	put(URL:any, data:any) {
		return new Promise((resolve, reject) => {
			this.connect('PUT', URL, data).toPromise().then(resp => {
				resolve(resp);
			}).catch(err => {
				this.checkError(err);
				reject(err);
			})
		});
	}

	checkError(err:any) {
		console.log(err);
	}
}


export class exService {
	apiPath: any;
	searchField = [];
	allowCache = true;
	serviceName = '';
	commonService: CommonService;

	constructor(apiPath: any, searchField:any, commonService: CommonService) {
		this.apiPath = apiPath;
		this.serviceName = searchField.name;
		this.searchField = searchField.value.filelds;
		this.allowCache = searchField.value.cache;
		this.commonService = commonService;
	}

	getAnItem(id:any, UID: string = '') {
		return this.commonService.getAnItemOnServer(id, UID, this.apiPath.getItem);
	}

	read(query: any = null, forceReload = false) {
        //connect server
        var that = this;
        return new Promise(function (resolve, reject) {
            let apiPath = that.apiPath.getList;
            that.commonService.connect(apiPath.method, apiPath.url(), query).toPromise()
                .then((data: any) => {
                    var result = { count: data.length, data: data };
                    resolve(result);
                })
                .catch(err => {
                    that.commonService.checkError(err);
                    reject(err);
                });
        });
	}

	search(query: any = null) {
		let apiPath = this.apiPath.getSearchList;
		return this.commonService.connect(apiPath.method, apiPath.url(), query);
	}

	save(item:any, isForceCreate = false) {
		return this.commonService.save(item, this.apiPath, isForceCreate);
	}

	delete(items:any) {
		return this.commonService.delete(items, this.apiPath);
	}

}