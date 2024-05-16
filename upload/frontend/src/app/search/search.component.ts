import { Component } from '@angular/core';
import {FormGroup, FormsModule} from '@angular/forms';
import { StockServiceService } from '../stock.service';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [FormsModule, ProfileComponent, CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, FooterComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit{
    searchValue: any = '';
    searchForm: FormGroup = new FormGroup({});
    showProfile: boolean = false;
    searchUrl: string = '';
    noInput: boolean = false
    autoCompleteList: any[] = []
    loadSpinner = false

    constructor(
        private stockService: StockServiceService, 
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({ userInput: '' });

        // this.searchForm.get('userInput')!.valueChanges
        //     .pipe(
        //         tap(value => {
        //             if (value !== '') {
        //                 this.loadSpinner = true;
        //             }
        //             this.autoCompleteList = [];
        //         }),
        //         debounceTime(300),
        //         switchMap(value => this.stockService.getAutoComplete(value)),
        //         tap(() => {
        //             this.loadSpinner = false;
        //         })
        //     )
        //     .subscribe(data => {
        //         this.autoCompleteList = JSON.parse(JSON.stringify(data)).result.filter((item: { displaySymbol: string }) => !item.displaySymbol.includes('.'));
        //         console.log(this.autoCompleteList)
        //     })

        this.searchForm.get('userInput')!.valueChanges
        .pipe(
            tap(value => {
                if (value !== '') {
                    this.loadSpinner = true;
                }
                this.autoCompleteList = [];
            }),
            debounceTime(300),
            switchMap(value => {
                if (value !== '') {
                    return this.stockService.getAutoComplete(value);
                } else {
                    this.loadSpinner = false;
                    return []; 
                }
            }),
            tap(() => {
                this.loadSpinner = false;
            })
        )
        .subscribe((data: any) => {
            if (data && data.result) {
                this.autoCompleteList = JSON.parse(JSON.stringify(data)).result.filter((item: { displaySymbol: string }) => !item.displaySymbol.includes('.'));
            }
            console.log(this.autoCompleteList);
        });

        
        this.stockService.showProfile.subscribe(b => {
            this.showProfile = b;
        })
        this.stockService.currentTicker.subscribe(ticker => {
            if (ticker && ticker !== this.searchValue) {
                this.searchValue = ticker
                this.searchForm.patchValue({userInput: ticker})
                this.onSubmit(ticker)
            }
        });
        this.stockService.submitTicker$.subscribe(ticker => {
            this.searchValue = ticker
            this.searchForm.patchValue({userInput: ticker})
            this.onSubmit(ticker);
        });
    }

    onOptionSelected(event: any) {
        console.log(event)
        const selectedCompany = event.option.value;
        this.searchForm.get('userInput')!.setValue(selectedCompany.symbol);
        this.onSubmit(selectedCompany.symbol); 
    }

    onSubmit(ticker: string) {
        if (!ticker.trim()) {
            this.noInput = true;
            return;
        }
        this.noInput = false; 
        ticker = ticker.trim().toLocaleUpperCase()
        this.searchValue = ticker;
        this.showProfile = true;
        this.stockService.changeShowProfile(true);
        // this.stockService.changeTicker(ticker);
        this.router.navigateByUrl(`/search/${this.searchValue}`);
    }

    clearInput() {
        this.autoCompleteList = []
        this.searchValue = '';
        this.noInput = false
        this.showProfile = false;
        this.stockService.changeShowProfile(false);
        this.stockService.changeTicker('')
        this.router.navigateByUrl(`/search/home`);
        this.searchForm.reset()
    }
}
