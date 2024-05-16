import { Component } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../balance.service';
import { BuyWindowComponent } from '../buy-window/buy-window.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockServiceService } from '../stock.service';
import { SellWindowComponent } from '../sell-window/sell-window.component';
import { switchMap } from 'rxjs';
import { tap, forkJoin, of } from 'rxjs';

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
    portfolioList: any = []
    isListEmpty = false
    balance: number = 0
    quoteData: any = {}
    buyAlert = false
    sellAlert = false
    company: any = {}
    isPortfolioReady = false

    constructor(
        private portfolioService: PortfolioService,
        private balanceService: BalanceService,
        private buyService: NgbModal,
        private stockService: StockServiceService,
        private sellService: NgbModal
    ) {}

    ngOnInit(): void {
        this.loadPortfolio()
    }

    loadPortfolio() {
        this.isPortfolioReady = false;
    
        this.balanceService.getBalance().pipe(
            tap((result) => {
                this.balance = result[0].balance;
            }),
            switchMap(() => this.portfolioService.getPortfolio()),
            tap((data) => {
                this.portfolioList = data;
                this.isListEmpty = this.portfolioList.length === 0;
            }),
            switchMap(() => {
                if (this.portfolioList.length > 0) {
                    return forkJoin(this.portfolioList.map((company: any) => 
                        this.stockService.getQuoteOneTime(company.symbol).pipe(
                            tap((quoteData) => {
                                const change = this.floatHelper(quoteData.c - company.avgCost);
                                const currentPrice = this.floatHelper(parseFloat(quoteData.c));
                                const marketValue = this.floatHelper(company.quantity * quoteData.c);
    
                                company.change = change;
                                company.currentPrice = currentPrice;
                                company.marketValue = marketValue;
    
                                this.portfolioService.changePortfolio(company._id, {
                                    change,
                                    currentPrice,
                                    marketValue
                                }).subscribe();
                            })
                        ))
                    );
                }
                return of([]);
            })
        ).subscribe({
            next: () => {
                this.isPortfolioReady = true;
            },
            error: (error) => {
                console.error('Error loading portfolio', error);
                this.isPortfolioReady = true;
            }
        });
    }
    

    floatHelper(num: number) {
        return parseFloat(num.toFixed(2))
    }

    openBuyWindow(ticker: string) {

        for (let i = 0; i < this.portfolioList.length; i++) {
            if (ticker === this.portfolioList[i].symbol) {
                this.company = this.portfolioList[i]
            }
        }
        const modalRef = this.buyService.open(BuyWindowComponent);
        const buyData = {
            'symbol': this.company.symbol,
            'name': this.company.name,
            'currentPrice': this.floatHelper(parseFloat(this.company.currentPrice)),
            'moneyInWallet': parseFloat(this.balance.toFixed(2)),
            'change': this.floatHelper(this.company.change),
        }
        modalRef.componentInstance.buyData = buyData;
        modalRef.result.then(
            (result) => {
                this.loadPortfolio()
                if (result === 'success') {
                    this.buyAlert = true
                    setTimeout(() => {
                        this.buyAlert = false;
                    }, 2000);
                }
            }, 
            () => {
                this.loadPortfolio()
            }
        );
    }

    openSellWindow(ticker: string) {
        for (let i = 0; i < this.portfolioList.length; i++) {
            if (ticker === this.portfolioList[i].symbol) {
                this.company = this.portfolioList[i]
            }
        }
        const modalRef = this.sellService.open(SellWindowComponent);
        const sellData = {
            'symbol': this.company.symbol,
            'name': this.company.name,
            'currentPrice': this.floatHelper(parseFloat(this.company.currentPrice)),
            'moneyInWallet': parseFloat(this.balance.toFixed(2)),
            'change': this.floatHelper(this.company.change),
        }
        console.log(sellData)
        modalRef.componentInstance.sellData = sellData;
        modalRef.result.then(
            (result) => {
                this.loadPortfolio()
                if (result === 'success') {
                    this.sellAlert = true
                    setTimeout(() => {
                        this.sellAlert = false;
                    }, 2000);
                }
            }, 
            () => {
                this.loadPortfolio()
            }
        );
    }

}
