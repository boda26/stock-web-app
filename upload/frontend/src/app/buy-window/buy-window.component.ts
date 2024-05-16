import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../balance.service';
import { PortfolioService } from '../portfolio.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-buy-window',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './buy-window.component.html',
    styleUrl: './buy-window.component.css'
})
export class BuyWindowComponent implements OnInit {
    @Input() public buyData: any;
    inputQuantity: number = 0
    totalCost: number = 0
    portfolioList: any[] = []
    balance: number = 0;
    notEnoughMoney = false

    constructor(
        public buyService: NgbActiveModal,
        public balanceService: BalanceService,
        public portfolioService: PortfolioService
    ){}

    ngOnInit(): void {
        this.balanceService.getBalance().subscribe((result) => {
            this.balance = result[0].balance
            console.log(this.balance)
        });
    }

    updateTotalCost() {
        this.totalCost = this.floatHelper(this.inputQuantity * this.buyData.currentPrice)
        if ((this.totalCost > this.balance) || (this.inputQuantity < 0)) {
            this.notEnoughMoney = true
        } else {
            this.notEnoughMoney = false
        }
    }

    closeModal() {
        this.buyService.close()
    }

    floatHelper(num: number) {
        return parseFloat(num.toFixed(2))
    }

    submitForm() {
        // check if already has this stock
        this.portfolioService.getPortfolio().subscribe((data) => {
            this.portfolioList = data
            let haveStock = false
            let stockItem: any = {}
            
            for (let i = 0; i < this.portfolioList.length; i++) {
                console.log(this.portfolioList[i])
                if (this.portfolioList[i].symbol === this.buyData.symbol) {
                    haveStock = true
                    stockItem = this.portfolioList[i]
                    break
                }
            }

            let changedBalance = {
                "balance": this.floatHelper(this.balance - this.totalCost)
            }
            console.log(changedBalance)
            this.balanceService.changeBalance(changedBalance).subscribe((data) => {
            });
            if (haveStock) {
                let avgCost = this.floatHelper((this.totalCost + stockItem.totalCost) / (this.inputQuantity + stockItem.quantity))
                let putItem = {
                    "symbol": this.buyData.symbol,
                    "name": this.buyData.name,
                    "quantity": this.inputQuantity + stockItem.quantity,
                    "avgCost": avgCost,
                    "totalCost": this.floatHelper(this.totalCost + stockItem.totalCost),
                    "change": this.floatHelper(this.buyData.currentPrice - avgCost),
                    "currentPrice": this.buyData.currentPrice,
                    "marketValue": this.floatHelper((this.inputQuantity + stockItem.quantity) * this.buyData.currentPrice)
                }
                this.portfolioService.changePortfolio(stockItem._id, putItem).subscribe({
                    next: (result) => console.log('Item added:', result),
                    error: (error) => console.error('Error adding item:', error)
                });
            } else {
                let postItem = {
                    "symbol": this.buyData.symbol,
                    "name": this.buyData.name,
                    "quantity": this.inputQuantity,
                    "avgCost": this.buyData.currentPrice,
                    "totalCost": this.floatHelper(this.totalCost),
                    "change": 0,
                    "currentPrice": this.buyData.currentPrice,
                    "marketValue": this.floatHelper(this.totalCost)
                }
                this.portfolioService.addToPortfolio(postItem).subscribe({
                    next: (result) => console.log('Item added:', result),
                    error: (error) => console.error('Error adding item:', error)
                });
            }
            this.buyService.close('success')
        })
    }

}
