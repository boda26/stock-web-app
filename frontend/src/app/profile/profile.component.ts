import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { StockServiceService } from '../stock.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterEvent } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import IndicatorsAll from "highcharts/indicators/indicators-all";
import { DbService } from '../watchlist.service';
import { BuyWindowComponent } from '../buy-window/buy-window.component';
import { BalanceService } from '../balance.service';
import { SellWindowComponent } from '../sell-window/sell-window.component';
import { PortfolioService } from '../portfolio.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [MatTabsModule, MatButtonModule, CommonModule, HighchartsChartModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule, FooterComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    profileData: any = {
        'placeholder': 'placeholder'
    };
    quoteData: any = {};
    peersData: any = {};
    hourlyPrices: object = {};
    ticker: string = '';
    curDateTime: string = '';
    positiveChange: boolean = false;
    highPrice: number = 0;
    lowPrice: number = 0;
    openPrice: number = 0;
    closePrice: number = 0;
    lastPrice: number = 0;
    change: number = 0;
    changePercent: number = 0;
    isMarketOpen: boolean = false;
    recentCloseTime: string = '';
    Highcharts: typeof Highcharts = Highcharts;
    chartConstructor: string = 'chart';
    HourlyChartOptions: Highcharts.Options = {
    };
    SMAChartOptions: Highcharts.Options = {
    };
    TrendChartOptions: Highcharts.Options = {
    }
    EarningsChartOptions: Highcharts.Options = {
    };
    hourlyChartCreated: boolean = false;
    isProfileReady: boolean = false;
    isQuoteReady: boolean = false;
    isPeersReady: boolean = false;
    isNewsReady: boolean = false;
    newsData: any = [];
    SMAChartCreated: boolean = false;
    totalMSPR: number = 0;
    totalMSPRChange: number = 0;
    totalPosMSPR: number = 0;
    totalPosMSPRChange: number = 0;
    totalNegMSPR: number = 0;
    totalNegMSPRChange: number = 0;
    isInsightsReady: boolean = false
    isTrendReady: boolean = false
    isEarningReady: boolean = false
    SMAData: any = []
    insightsData: any = {}
    trendData: any = []
    earningsData: any = []
    noDataFound: boolean = false
    isInList = false
    watchList: any = []
    idToRemove = ''
    addWatchListAlert = false
    removeWatchListAlert = false
    balance: number = 0
    holdStock = false
    buyAlert: boolean = false
    sellAlert: boolean = false

    constructor(
        private stockService: StockServiceService,
        private router: Router,
        private route: ActivatedRoute,
        private newsService: NgbModal,
        private dbService: DbService,
        private buyService: NgbModal,
        private balanceService: BalanceService,
        private sellService: NgbModal,
        private portfolioService: PortfolioService
    ){
    }

    ngOnInit(): void {
        // this.isProfileReady = false
        // this.isPeersReady = false
        // this.isQuoteReady = false
        // this.isNewsReady = false
        // this.newsData = []
        // this.curDateTime = '';
        // this.positiveChange = false;
        // this.highPrice = '';
        // this.lowPrice = '';
        // this.openPrice = '';
        // this.closePrice = '';
        // this.lastPrice = '';
        // this.change = '';
        // this.changePercent = '';
        // this.isMarketOpen = false;
        // this.recentCloseTime = '';
        this.hourlyChartCreated = false
        this.SMAChartCreated = false
        this.isTrendReady = false
        this.SMAChartOptions = {}
        this.HourlyChartOptions = {}
        this.balanceService.getBalance().subscribe((result) => {
            this.balance = result[0].balance
        });

        this.route.paramMap.subscribe((params) => {
            const newTicker = params.get('ticker') ?? '';
            this.ticker = this.stockService.getCurrentTicker()
            if (newTicker !== this.ticker) {
                this.ticker = newTicker;
                this.fetchData(this.ticker);
            } else {
                // if same ticker then load from service without new API call
                this.useExistingData()
            }
        });
    }

    useExistingData() {
        this.profileData = this.stockService.getExistingProfile()

        // load star
        this.dbService.getWatchList().subscribe((data) => {
            this.watchList = data;
            this.isInList = false
            for (let i = 0; i < this.watchList.length; i++) {
                if (this.watchList[i].symbol === this.ticker) {
                    this.isInList = true
                    this.idToRemove = this.watchList[i]._id
                }
            }
        })

        // check if stock is held
        this.portfolioService.getPortfolio().subscribe((portfolioData => {
            this.holdStock = false
            for (let i = 0; i < portfolioData.length; i++) {
                if (portfolioData[i].symbol === this.ticker) {
                    this.holdStock = true
                    break
                }
            }
        }))

        this.noDataFound = false
        this.stockService.quoteData.subscribe((data) => {
            this.quoteData = data;
            this.fetchQuote(); 
        });

        this.fetchPeers(this.stockService.getExistingPeers())
        this.fetchNews(this.stockService.getExistingNews())
        this.hourlyPrices = this.stockService.getExistingHourlyPrices()
        this.createHourlyCharts()
        this.SMAData = this.stockService.getExistingSMA()
        this.createSMAChart()
        this.insightsData = this.stockService.getExistingInsights()
        this.fetchInsights()
        this.trendData = this.stockService.getExistingTrend()
        this.createTrendChart()
        this.earningsData = this.stockService.getExistingEarnings()
        this.createEarningsChart()
        this.isProfileReady = true
        this.isQuoteReady = true
        this.isPeersReady = true
        this.isNewsReady = true
        this.hourlyChartCreated = true
        this.isTrendReady = true
        this.isEarningReady = true
    }

    fetchData(ticker: string): void {

        this.stockService.changeTicker(this.ticker);
        // profile

        this.stockService.profileData.subscribe((data) => {
            this.profileData = data;

            // load star
            this.dbService.getWatchList().subscribe((data) => {
                this.watchList = data;
                this.isInList = false
                for (let i = 0; i < this.watchList.length; i++) {
                    console.log(this.watchList[i])
                    if (this.watchList[i].symbol === this.ticker) {
                        this.isInList = true
                        this.idToRemove = this.watchList[i]._id
                        break
                    }
                }
            })

            // check if stock is held
            this.portfolioService.getPortfolio().subscribe((portfolioData => {
                this.holdStock = false
                for (let i = 0; i < portfolioData.length; i++) {
                    if (portfolioData[i].symbol === this.ticker) {
                        this.holdStock = true
                        break
                    }
                }
            }))

            this.isProfileReady = true;
            this.noDataFound = Object.keys(this.profileData).length === 0;
            if (this.noDataFound) {
                this.isProfileReady = true
                this.isQuoteReady = true
                this.isPeersReady = true
                this.isNewsReady = true
                this.hourlyChartCreated = true
                this.isTrendReady = true
                this.isEarningReady = true
                this.SMAChartCreated = true
            }
        })
            
        // quote
        this.stockService.quoteData.subscribe((data) => {
            this.quoteData = data;
            this.fetchQuote(); 
            this.isQuoteReady = true;
        });
            
        // peers
        this.stockService.peersData.subscribe((data) => {
            this.fetchPeers(data)
            this.isPeersReady = true;
        });
        
        // news
        this.stockService.newsData.subscribe((news) => {
            this.fetchNews(news)
            this.isNewsReady = true;
        });

        // hourly
        this.stockService.hourlyPricesData.subscribe((hourlyPrices) => {
            this.hourlyPrices = hourlyPrices
            this.createHourlyCharts()
            this.hourlyChartCreated = true
        })
        
        // SMA
        this.stockService.SMAData.subscribe((SMAData) => {
            this.SMAData = SMAData
            this.createSMAChart()
        })

        // insights
        this.stockService.insightsData.subscribe((insights) => {
            this.insightsData = insights
            this.fetchInsights()
        })

        // trend
        this.stockService.trendData.subscribe((trend) => {
            this.trendData = trend
            this.createTrendChart()
            this.isTrendReady = true
        })

        //earnings
        this.stockService.earningsData.subscribe((earnings) => {
            this.earningsData = earnings
            this.createEarningsChart()
            this.isEarningReady = true
        })

        this.stockService.searchStock(ticker);
        this.stockService.getQuote();
        this.stockService.getPeers(ticker);
        this.stockService.getNews(ticker);
        this.stockService.getHourlyPrices(ticker)
        this.stockService.getSMAData(ticker)
        this.stockService.getInsights(ticker)
        this.stockService.getTrend(ticker)
        this.stockService.getEarnings(ticker)
    }

    fetchInsights() {
        this.totalMSPR = 0;
        this.totalMSPRChange = 0;
        this.totalPosMSPR = 0;
        this.totalPosMSPRChange = 0;
        this.totalNegMSPR = 0;
        this.totalNegMSPRChange = 0;
        let insightsData = JSON.parse(JSON.stringify(this.insightsData)).data
        for (let i = 0; i < insightsData.length; i++) {
            let insightData = insightsData[i]
            let mspr = parseFloat(insightData.mspr)
            let change = parseFloat(insightData.change)
            this.totalMSPR += mspr
            this.totalMSPRChange += change
            if (mspr > 0) {
                this.totalPosMSPR += mspr
            } else {
                this.totalNegMSPR += mspr
            }
            if (change > 0) {
                this.totalPosMSPRChange += change
            } else {
                this.totalNegMSPRChange += change
            }
        }
        this.totalMSPR = parseFloat(this.totalMSPR.toFixed(2))
        this.totalMSPRChange = parseFloat(this.totalMSPRChange.toFixed(2))
        this.totalPosMSPR = parseFloat(this.totalPosMSPR.toFixed(2))
        this.totalPosMSPRChange = parseFloat(this.totalPosMSPRChange.toFixed(2))
        this.totalNegMSPR = parseFloat(this.totalNegMSPR.toFixed(2))
        this.totalNegMSPRChange = parseFloat(this.totalNegMSPRChange.toFixed(2))
        this.isInsightsReady = true;
    }

    fetchPeers(data: any) {
        if (Array.isArray(data)) {
            this.peersData = Array.from(new Set(data.filter((peer: string) => !peer.includes('.'))));
        } else {
            console.error('peersData is not an array:', data);
            this.peersData = [];
        }
    }

    fetchNews(news: any) {
        this.newsData = [];
        for (let i = 0; i < news.length && this.newsData.length < 20; i++) {
            if (news[i]?.image !== '') {
                this.newsData.push(news[i]);
            }
        }
    }

    fetchQuote() {
        this.curDateTime = this.formatTimestamp(this.quoteData.t);
        if (parseFloat(this.quoteData.d) < 0) {
            this.positiveChange = false;
        } else {
            this.positiveChange = true;
        }
        this.highPrice = this.floatHelper(this.quoteData.h)
        this.lowPrice = this.floatHelper(this.quoteData.l)
        this.openPrice = this.floatHelper(this.quoteData.o)
        this.closePrice = this.floatHelper(this.quoteData.pc)
        this.lastPrice = this.floatHelper(this.quoteData.c)
        this.change = this.floatHelper(this.quoteData.d)
        this.changePercent = this.floatHelper(this.quoteData.dp)

        // check if market is open
        const now = new Date();
        const dayOfWeek = now.getDay();
        const hour = now.getHours();
        const minutes = now.getMinutes();   
        const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
        const isTimeInRange = (hour > 6 || (hour === 6 && minutes >= 30)) && hour < 13;
        if (isWeekday && isTimeInRange) {
            this.isMarketOpen = true
        } else {
            this.isMarketOpen = false
        }
        if (!this.isMarketOpen) {
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                if (now.getHours() >= 0 && (now.getHours() < 6 || (now.getHours() == 6 && now.getMinutes() < 30))) {
                    now.setDate(now.getDate() - 1)   
                }
            } else {
                if (dayOfWeek == 0) {
                    now.setDate(now.getDate() - 2)
                } else if (dayOfWeek == 6) {
                    now.setDate(now.getDate() - 1)
                }
            }
            now.setHours(6, 0, 0)
            this.recentCloseTime = now.toISOString().replace('T', ' ').substring(0, 19);
        }
        // if (this.idToRemove !== '') {
        //     const updatedData = {
        //         "closePrice": this.lastPrice,
        //         "change": this.change,
        //         "changePercent": this.changePercent
        //     }
        //     this.dbService.updateToWatchList(this.idToRemove, updatedData).subscribe({
        //         next: (result) => console.log('Quote updated: ', result),
        //         error: (error) => console.error('Error updating item:', error)
        //     });
        // }
    }

    openModal(news: any) {
        const modalRef = this.newsService.open(NewsCardComponent);
        modalRef.componentInstance.newsData = news;
    }

    createHourlyCharts() {
        let results = JSON.parse(JSON.stringify(this.hourlyPrices)).results
        let chartTitle = this.ticker + " Hourly Price Variation"
        // let timeList = []
        let closePriceList = []
        for (let i in results) {
            // let date = new Date(results[i].t);
            // let formattedTime = (date.getHours() + 8) + ':' + ('0' + date.getMinutes()).slice(-2);
            // timeList.push(results[i].t);
            closePriceList.push([
                results[i].t,
                results[i].c
            ])
        }
        // console.log(timeList)
        // console.log(closePriceList)
        let lineColor = 'green'
        if (parseFloat(this.quoteData.d) < 0) {
            lineColor = 'red'
        }
        this.HourlyChartOptions = {
            chart: {
                type: 'line',
                backgroundColor: '#f2f2f2'
            },
            title: {
                text: chartTitle
            },
            xAxis: {
                // categories: timeList,
                // labels: {
                //     step: 4
                // }
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: null
                },
                opposite: true
            },
            series: [{
                name: this.ticker,
                data: closePriceList,
                type: 'line',
                marker: {
                    enabled: false
                },
                color: lineColor
            }],
            legend: {
                enabled: false 
            },
        };
    }

    // fetchSMAData() {
    //     this.stockService.getSMAData(this.ticker).subscribe((SMAData) => {
    //         this.createSMAChart(SMAData);
    //         this.SMAChartCreated = true;
    //     })
    // }

    createSMAChart() {
        IndicatorsAll(Highcharts);
        let results = JSON.parse(JSON.stringify(this.SMAData)).results
        let ohlc = []
        let volume = []
        if (typeof results === 'undefined') {
            console.log(1)
            return;
        }
        let dataLength = results.length
        let groupingUnits: any = [
            ['day', [1]],
            ['week', [[1]]],
            ['month', [[1]]]
            // ['week', [1]],
            // ['month', [1, 2, 3, 4, 6]]
        ];
    
        for (let i = 0; i < dataLength; i += 1) {
            ohlc.push({
                x: results[i].t, // the date
                open: results[i].o, // open
                high: results[i].h, // high
                low: results[i].l, // low
                close: results[i].c // close
            });
    
            volume.push({
                x: results[i].t, // the date
                y: results[i].v // the volume
            });
        }

        let chartTitle = this.ticker + ' Historical'

    
        this.SMAChartOptions = {
            rangeSelector: {
                selected: 2
            },
            chart: {
                backgroundColor: '#f2f2f2',
            },
            title: {
                text: chartTitle
            },
            subtitle: {
                text: 'With SMA and Volume by Price technical indicators'
            },
    
            yAxis: [{
                startOnTick: false,
                endOnTick: false,
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],
    
            tooltip: {
                split: true
            },
    
            plotOptions: {
                series: {
                    dataGrouping: {
                        units: groupingUnits
                    }
                }
            },
    
            series: [{
                type: 'candlestick',
                name: this.ticker,
                id: 'myid',
                zIndex: 2,
                data: ohlc
            }, {
                type: 'column',
                name: 'Volume',
                id: 'volume',
                yAxis: 1,
                data: volume
            }, {
                type: 'vbp',
                linkedTo: 'myid',
                params: {
                    volumeSeriesID: 'volume'
                },
                dataLabels: {
                    enabled: false
                },
                zoneLines: {
                    enabled: false
                }
            }, {
                type: 'sma',
                linkedTo: 'myid',
                zIndex: 1,
                marker: {
                    enabled: false
                }
            }]
        };
        this.SMAChartCreated = true;
    }

    // fetchTrend() {
    //     this.stockService.getTrend(this.ticker).subscribe((data) => {
    //         this.createTrendChart(data)
    //         this.isTrendReady = true;
    //     })
    // }

    createTrendChart() {
        let data = this.trendData
        let strongBuyList = []
        let buyList = []
        let holdList = []
        let sellList = []
        let strongSellList = []
        let dateList = []
        for (let i = 0; i < data.length; i++) {
            strongBuyList.push(data[i].strongBuy)
            buyList.push(data[i].buy)
            holdList.push(data[i].hold)
            sellList.push(data[i].sell)
            strongSellList.push(data[i].strongSell)
            dateList.push(data[i].period.substring(0, 7))
        }
        this.TrendChartOptions = {
            chart: {
                type: 'column',
                backgroundColor: '#f2f2f2',
            },
            title: {
                text: 'Recommendation Trends',
            },
            xAxis: {
                categories: dateList
            },
            yAxis: {
                min: 0,
                title: {
                    text: '#Analysis'
                },
                stackLabels: {
                    enabled: false
                }
            },
            legend: {
                align: 'center',
                x: 0,
                verticalAlign: 'bottom',
                y: 0,
                floating: false,
                backgroundColor: '#f2f2f2',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                type: 'column',
                name: 'Strong Buy',
                data: strongBuyList,
                color: '#12471a'
            }, {
                type: 'column',
                name: 'Buy',
                data: buyList,
                color: '#33b05f'
            }, {
                type: 'column',
                name: 'Hold',
                data: holdList,
                color: '#9c620b'
            }, {
                type: 'column',
                name: 'Sell',
                data: sellList,
                color: 'red'
            }, {
                type: 'column',
                name: 'Strong Sell',
                data: strongSellList,
                color: '#872239'
            }]
        }
    }

    // fetchEarnings() {
    //     this.stockService.getEarnings(this.ticker).subscribe((data) => {
    //         this.createEarningsChart(data)
    //     })
    // }

    createEarningsChart() {
        let data = this.earningsData
        let actualList = []
        let estimateList = []
        let periodList = []
        let surpriseList: any = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].actual === null) {
                actualList.push(0)
            } else {
                actualList.push(data[i].actual)
            }
            if (data[i].estimate === null) {
                estimateList.push(0)
            } else {
                estimateList.push(data[i].estimate)
            }
            if (data[i].surprise === null) {
                surpriseList.push(0)
            } else {
                surpriseList.push(data[i].surprise)
            }
            periodList.push(data[i].period)
        }
        
        this.EarningsChartOptions = {
            chart: {
                type: 'spline',
                inverted: false,
                backgroundColor: '#f2f2f2'
            },
            title: {
                text: 'Historical EPS Surprises',
            },
            xAxis: {
                categories: periodList,
                labels: {
                    formatter: function() {
                        // Using the index of the current label to get the surprise value
                        let surpriseValue = surpriseList[this.pos];
                        return `${this.value}<br><span>Surprise: ${surpriseValue}</span>`;
                    },
                    useHTML: true  // Allows HTML in labels
                }
            },
            yAxis: {
                title: {
                    text: 'Quarterly EPS'
                }
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: [{
                type: 'spline',
                name: 'Actual',
                data: actualList
            }, {
                type: 'spline',
                name: 'Estimate',
                data: estimateList
            }]
        }
    }

    searchPeer(ticker: string, event: MouseEvent) {
        event.preventDefault()
        // this.stockService.changeTicker(ticker)
        // this.router.navigateByUrl(`/search/${ticker}`)
        this.router.navigateByUrl(`/search/${ticker}`).then(() => {
            this.stockService.setProfile({})
            this.stockService.setQuote({})
            this.stockService.setHourlyPrices({})
            this.stockService.setNews({})
            this.stockService.setPeers({})
            this.stockService.setSMA({})
            this.stockService.setInsights({})
            this.stockService.setTrend({})
            this.stockService.setEarnings({})

            this.ngOnInit()
        })
    }

    floatHelper(data: number) {
        return parseFloat(data.toFixed(2))
    }

    formatTimestamp(timestamp: string) {
        let dateObj: Date;
        if (!isNaN(+timestamp)) {
            dateObj = new Date(+timestamp * 1000);
        } else {
            dateObj = new Date(timestamp);
        }
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    starClicked() {
        if (this.isInList) {
            this.starRemoveFromList(this.idToRemove)
            this.isInList = false
            this.removeWatchListAlert = true
            setTimeout(() => {
                this.removeWatchListAlert = false;
            }, 2000);
        } else {
            this.starAddToList()
            this.isInList = true
            this.addWatchListAlert = true;
            setTimeout(() => {
                this.addWatchListAlert = false;
            }, 2000); 
        }
    }

    starAddToList() {
        if (this.isInList) {
            return
        }
        let closePrice = this.quoteData.c.toFixed(2)
        let change = this.quoteData.d.toFixed(2)
        let changePercent = this.quoteData.dp.toFixed(2)
        let item = {
            'symbol': this.profileData.ticker,
            'name': this.profileData.name,
            'closePrice': this.lastPrice,
            'change': change,
            'changePercent': changePercent
        }
        this.dbService.addToWatchList(item).subscribe({
            next: (result) => console.log('Item added:', result),
            error: (error) => console.error('Error adding item:', error)
        });
    }

    starRemoveFromList(id: string) {
        this.dbService.deleteFromWatchList(id).subscribe({
            next: (result) => {
                console.log('Item deleted:', result)
            },
            error: (error) => console.error('Error deleting item:', error)
        })
    }

    openBuyWindow() {
        const modalRef = this.buyService.open(BuyWindowComponent);
        const buyData = {
            'symbol': this.profileData.ticker,
            'name': this.profileData.name,
            'currentPrice': this.lastPrice,
            'moneyInWallet': this.floatHelper(this.balance),
            'change': this.change,
        }
        modalRef.componentInstance.buyData = buyData;
        modalRef.result.then(
            (result) => {
               if (result === 'success') {
                this.ngOnInit()
                this.buyAlert = true
                setTimeout(() => {
                    this.buyAlert = false;
                }, 2000);
               }
            }, 
            () => {
            }
        );
    }

    openSellWindow() {
        const modalRef = this.sellService.open(SellWindowComponent);
        const sellData = {
            'symbol': this.profileData.ticker,
            'name': this.profileData.name,
            'currentPrice': this.lastPrice,
            'moneyInWallet': this.floatHelper(this.balance),
            'change': this.change,
        }
        modalRef.componentInstance.sellData = sellData;
        modalRef.result.then(
            (result) => {
                if (result === 'success') {
                    this.ngOnInit()
                    this.sellAlert = true
                    setTimeout(() => {
                        this.sellAlert = false;
                    }, 2000);
                }
            }, 
            () => {
            }
        );
    }
}

