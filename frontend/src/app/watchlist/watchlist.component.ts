import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DbService } from '../watchlist.service';
import { CommonModule } from '@angular/common';
import { StockServiceService } from '../stock.service';
import { tap, from, mergeMap } from 'rxjs';

@Component({
    selector: 'app-watchlist',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './watchlist.component.html',
    styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit {
    watchList: any = []
    isListEmpty: boolean = false
    isWatchlistReady = false

    constructor(
        private dbService: DbService,
        private stockService: StockServiceService
    ){}

    ngOnInit(): void {
        this.isWatchlistReady = false
        this.loadWatchList()
    }

    loadWatchList() {
        this.dbService.getWatchList().subscribe((data) => {
            this.watchList = data;
            console.log(this.watchList);
            if (this.watchList.length === 0) {
                this.isListEmpty = true;
            } else {
                from(this.watchList).pipe(
                    mergeMap((company: any) => this.stockService.getQuoteOneTime(company.symbol).pipe(
                        tap((quoteData: any) => {
                            console.log(quoteData);
                            const closePrice = this.floatHelper(quoteData.c);
                            const change = this.floatHelper(quoteData.d);
                            const changePercent = this.floatHelper(quoteData.dp);
    
                            company.closePrice = closePrice;
                            company.change = change;
                            company.changePercent = changePercent;
    
                        }),
                        mergeMap(quoteData => this.dbService.updateToWatchList(company._id, {
                            closePrice: this.floatHelper(quoteData.c),
                            change: this.floatHelper(quoteData.d),
                            changePercent: this.floatHelper(quoteData.dp)
                        }))
                    ))
                ).subscribe(() => {
                    console.log("watchlist updated");
                });
            }
            this.isWatchlistReady = true;
        });
    }
    

    // loadWatchList() {
    //     this.dbService.getWatchList().subscribe((data) => {
    //         this.watchList = data;
    //         console.log(this.watchList)
    //         if (this.watchList.length === 0) {
    //             this.isListEmpty = true
    //         }

    //         for (let i = 0; i < this.watchList.length; i++) {
    //             let company = this.watchList[i];
    //             this.stockService.getQuoteOneTime(company.symbol).pipe(
    //                 tap((quoteData: any) => {
    //                     console.log(quoteData)
    //                     const closePrice = this.floatHelper(quoteData.c);
    //                     const change = this.floatHelper(quoteData.d);
    //                     const changePercent = this.floatHelper(quoteData.dp);

    //                     company.closePrice = closePrice
    //                     company.change = change;
    //                     company.changePercent = changePercent

    //                     console.log(company.closePrice)

    //                     this.dbService.updateToWatchList(company._id, {
    //                         closePrice,
    //                         change,
    //                         changePercent
    //                     }).subscribe();
    //                 })
    //             )
    //         }
    //         console.log("watchlist updated")
    //         this.isWatchlistReady = true
    //     })
    // }

    floatHelper(num: string) {
        return parseFloat(parseFloat(num).toFixed(2))
    }

    removeFromList(id: string) {
        this.dbService.deleteFromWatchList(id).subscribe({
            next: (result) => {
                console.log('Item deleted:', result)
                this.loadWatchList()
            },
            error: (error) => console.error('Error deleting item:', error)
        })
    }

    cardClicked(ticker: string) {
        this.stockService.triggerSubmitTicker(ticker);
    }
}
