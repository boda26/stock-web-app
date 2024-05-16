import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private dbUrl = 'https://stockapp25.wl.r.appspot.com/api/portfolio-db'
    // private dbUrl = 'http://127.0.0.1:3000/api/portfolio-db'

    constructor(
        private http: HttpClient
    ) {}

    getPortfolio(): Observable<any> {
        return this.http.get<any>(this.dbUrl)
    }

    addToPortfolio(item: any) {
        return this.http.post(this.dbUrl, item)
    }

    changePortfolio(id: string, item: any) {
        return this.http.put(`${this.dbUrl}/${id}`, item)
    }

    deleteFromPortfolio(id: string) {
        return this.http.delete(`${this.dbUrl}/${id}`)
    }
}
