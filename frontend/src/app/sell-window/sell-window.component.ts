import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../balance.service';
import { PortfolioService } from '../portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sell-window',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sell-window.component.html',
  styleUrl: './sell-window.component.css'
})
export class SellWindowComponent {
    @Input() public sellData: any;
    inputQuantity: number = 0
    totalPrice: number = 0
    portfolioList: any[] = []
    balance: number = 0;
    canNotSell = false
    idToDelete = ''
    currentQuantity = 0;
    avgCost = 0;
    totalCost = 0;

    constructor(
        public sellService: NgbActiveModal,
        public balanceService: BalanceService,
        public portfolioService: PortfolioService
    ){}

    ngOnInit(): void {
        this.balanceService.getBalance().subscribe((result) => {
            this.balance = result[0].balance
            console.log(this.balance)
        });
        this.portfolioService.getPortfolio().subscribe((data) => {
            this.portfolioList = data
            for (let i = 0; i < this.portfolioList.length; i++) {
                if (this.portfolioList[i].symbol === this.sellData.symbol) {
                    this.idToDelete = this.portfolioList[i]._id
                    this.currentQuantity = this.portfolioList[i].quantity
                    this.avgCost = this.portfolioList[i].avgCost
                    this.totalCost = this.portfolioList[i].totalCost
                }
            }
        })
    }

    updateTotalCost() {
        this.totalPrice = this.floatHelper(this.inputQuantity * this.sellData.currentPrice)
        if ((this.inputQuantity > this.currentQuantity) || (this.inputQuantity < 0)) {
            this.canNotSell = true
        } else {
            this.canNotSell = false
        }
    }

    closeModal() {
        this.sellService.close()
    }

    floatHelper(num: number) {
        return parseFloat(num.toFixed(2))
    }

    submitForm() {

        this.inputQuantity = Math.min(this.inputQuantity, this.currentQuantity)
        this.totalPrice = this.floatHelper(this.inputQuantity * this.sellData.currentPrice)
        let changedBalance = {
            "balance": this.floatHelper(this.balance + this.totalPrice)
        }
        this.balanceService.changeBalance(changedBalance).subscribe((data) => {
        });

        if (this.inputQuantity >= this.currentQuantity) {
            this.portfolioService.deleteFromPortfolio(this.idToDelete).subscribe({
                next: (result) => console.log('Item deleted:', result),
                error: (error) => console.error('Error deleting item:', error)
            });
        } else {
            this.currentQuantity -= this.inputQuantity
            let avgCost = this.floatHelper((this.totalCost - this.totalPrice) / this.currentQuantity);
            let putItem = {
                "quantity": this.currentQuantity,
                "avgCost": avgCost,
                "totalCost": this.floatHelper(this.totalCost - this.totalPrice),
                "change": this.floatHelper(this.sellData.currentPrice - this.avgCost),
                "currentPrice": this.sellData.currentPrice,
                "marketValue": this.floatHelper(this.sellData.currentPrice * this.currentQuantity)
            }
            this.portfolioService.changePortfolio(this.idToDelete, putItem).subscribe({
                next: (result) => console.log('Item added:', result),
                error: (error) => console.error('Error adding item:', error)
            });
        }
        this.sellService.close('success')
    }
}
