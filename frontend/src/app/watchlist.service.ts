import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DbService {

    // private dbUrl = 'http://127.0.0.1:3000/api/db'
    private dbUrl = 'https://stockapp25.wl.r.appspot.com/api/db'

    constructor(private http: HttpClient) {}

    getWatchList(): Observable<any> {
        return this.http.get<any>(this.dbUrl)
    }

    addToWatchList(item: any) {
        return this.http.post(this.dbUrl, item)
    }

    deleteFromWatchList(id: string) {
        return this.http.delete(`${this.dbUrl}/${id}`)
    }

    updateToWatchList(id: string, data: any) {
        return this.http.put(`${this.dbUrl}/${id}`, data)
    }
}
