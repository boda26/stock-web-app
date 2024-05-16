import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { StockServiceService } from '../stock.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
    url = '';

    ngOnInit(): void {
        this.stockService.currentTicker.subscribe((ticker) => {
            if (ticker === '') {
                this.url = '/search/home'
            } else {
                this.url = '/search/' + ticker
            }
        })
    }

    constructor(private stockService: StockServiceService){}

    
}
