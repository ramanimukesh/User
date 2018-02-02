import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../components/user/user';
import { RequestOptions, RequestMethod, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  saveUser(user: User): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({method: RequestMethod.Post, headers: headers});
    return this.http.post('http://localhost:8080/SpringBootCRUDApp/api/user/', user, options)
                   .map(this.extractStatus)
                   .catch(this.handleError);
  }

  retrieveUsers(): Observable<User[]> {
    const headers = new Headers();
    headers.append('accept', 'application/json');
    const options = new RequestOptions({method: RequestMethod.Get, headers: headers});
    return this.http.get('http://localhost:8080/SpringBootCRUDApp/api/user/', options)
                   .map(this.extractData)
                   .catch(this.handleError);
  }

  private extractData(res: Response) {
      const body = res.json();
      return body || [];
  }

  private extractStatus(res: Response) {
      const body = res.status;
      return body || {};
  }
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
  }
 /* private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } */
}
