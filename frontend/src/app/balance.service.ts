import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BalanceService {
    // private dbUrl = 'http://127.0.0.1:3000/api/balance'
    private dbUrl = 'https://stockapp25.wl.r.appspot.com/api/balance'
    private balanceId = '6600d260f308cff331ceec1a'

    constructor(
        private http: HttpClient
    ) {}

    getBalance(): Observable<any> {
        return this.http.get<any>(this.dbUrl)
    }

    changeBalance(data: any) {
        return this.http.put(`${this.dbUrl}/${this.balanceId}`, data)
    }
}
