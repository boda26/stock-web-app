import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

    private showStockProfile = new BehaviorSubject<boolean>(false);
    private ticker = new BehaviorSubject<string>('');
    private profile = new BehaviorSubject({
        'placeholder': 'placeholder'
    });
    private quote = new BehaviorSubject({});
    private peers = new BehaviorSubject({});
    private hourlyPrices = new BehaviorSubject({});
    private news = new BehaviorSubject<Array<any>>([]);
    private SMA = new BehaviorSubject<Array<any>>([]);
    private insights = new BehaviorSubject({});
    private trend = new BehaviorSubject<Array<any>>([]);
    private earnings = new BehaviorSubject<Array<any>>([]);

    showProfile = this.showStockProfile.asObservable()
    profileData = this.profile.asObservable()
    quoteData = this.quote.asObservable()
    peersData = this.peers.asObservable()
    hourlyPricesData = this.hourlyPrices.asObservable()
    newsData = this.news.asObservable()
    SMAData = this.SMA.asObservable()
    insightsData = this.insights.asObservable()
    trendData = this.trend.asObservable()
    earningsData = this.earnings.asObservable()
    currentTicker = this.ticker.asObservable();

    private submitTickerSubject = new Subject<string>();
    submitTicker$ = this.submitTickerSubject.asObservable();

    // host = 'http://127.0.0.1:3000/api'
    host: string = 'https://stockapp25.wl.r.appspot.com/api'

    changeShowProfile(b: boolean) {
        this.showStockProfile.next(b)
    }

    changeTicker(data: string) {
        if (data !== this.ticker.value) {
            this.ticker.next(data);
        }
    }

    constructor(private http: HttpClient) { }

    getExistingProfile(): any {
        return this.profile.value
    }

    getExistingQuote(): any {
        return this.quote.value
    }

    getExistingPeers(): any {
        return this.peers.value
    }

    getExistingHourlyPrices(): any {
        return this.hourlyPrices.value
    }

    getExistingNews(): any {
        return this.news.value
    }

    getExistingSMA(): any {
        return this.SMA.value
    }

    getExistingInsights(): any {
        return this.insights.value
    }

    getExistingTrend(): any {
        return this.trend.value
    }

    getExistingEarnings(): any {
        return this.earnings.value
    }

    getCurrentTicker(): string {
        return this.ticker.value
    }

    setProfile(data: any) {
        this.profile.next(data)
    }

    setQuote(data: any) {
        this.quote.next(data)
    }

    setHourlyPrices(data: any) {
        this.hourlyPrices.next(data)
    }

    setNews(data: any) {
        this.news.next(data)
    }

    setPeers(data: any) {
        this.peers.next(data)
    }

    setSMA(data: any) {
        this.SMA.next(data)
    }

    setInsights(data: any) {
        this.insights.next(data)
    }

    setTrend(data: any) {
        this.trend.next(data)
    }

    setEarnings(data: any) {
        this.earnings.next(data)
    }

    searchStock(ticker: string): void {
        console.log(111)
        this.http.get<any>(`${this.host}/profile/${ticker}`).subscribe(
            data => this.profile.next(data)
        )
    }

    getQuote(): void {
        let isMarketOpen = true
        const now = new Date();
        const dayOfWeek = now.getDay();
        const hour = now.getHours();
        const minutes = now.getMinutes();   
        const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
        const isTimeInRange = (hour > 6 || (hour === 6 && minutes >= 30)) && hour < 13;
        if (isWeekday && isTimeInRange) {
            isMarketOpen = true
        } else {
            isMarketOpen = false
        }
        console.log("current market status: " + isMarketOpen)
        console.log(this.ticker.value)
        if (isMarketOpen) {
            timer(0, 15000)
            .pipe(
            switchMap(() => this.http.get<any>(`${this.host}/quote/${this.ticker.value}`))
            )
            .subscribe(
            data => this.quote.next(data),
            error => console.error('Error fetching quote:', error)
            );
        } else {
            this.http.get<any>(`${this.host}/quote/${this.ticker.value}`).subscribe(
                data => this.quote.next(data)
            )
        }
    }

    getQuoteOneTime(ticker: string): Observable<any> {
        return this.http.get<any>(`${this.host}/quote/${ticker}`)
    }

    getPeers(ticker: string): void {
        this.http.get<any>(`${this.host}/peers/${ticker}`).subscribe(
            data => this.peers.next(data)
        )
    }

    getHourlyPrices(ticker: string): void {
        this.http.get<any>(`${this.host}/hourly/${ticker}`).subscribe(
            data => this.hourlyPrices.next(data)
        )
    }

    getNews(ticker: string): void {
        this.http.get<any>(`${this.host}/news/${ticker}`).subscribe(
            data => this.news.next(data)
        )
    }

    getSMAData(ticker: string): void {
        this.http.get<any>(`${this.host}/history/${ticker}`).subscribe(
            data => this.SMA.next(data)
        )
    }

    getInsights(ticker: string): void {
        this.http.get<any>(`${this.host}/insight/${ticker}`).subscribe(
            data => this.insights.next(data)
        )
    }

    getTrend(ticker: string): void {
        this.http.get<any>(`${this.host}/trend/${ticker}`).subscribe(
            data => this.trend.next(data)
        )
    }

    getEarnings(ticker: string): void {
        this.http.get<any>(`${this.host}/earnings/${ticker}`).subscribe(
            data => this.earnings.next(data)
        )
    }

    getAutoComplete(ticker: string): Observable<any> {
        return this.http.get<any>(`${this.host}/autocomplete/${ticker}`)
    }

    triggerSubmitTicker(ticker: string) {
        this.submitTickerSubject.next(ticker);
    }
}
