import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-news-card',
    standalone: true,
    imports: [],
    templateUrl: './news-card.component.html',
    styleUrl: './news-card.component.css'
})
export class NewsCardComponent implements OnInit {
    @Input() public newsData: any;
    formatDate: string = ""
    facebookUrl: string = ""

    constructor(public newsService: NgbActiveModal){}

    ngOnInit(): void {
        console.log(this.newsData)

        const milliseconds = this.newsData.datetime * 1000;
        const dateObject = new Date(milliseconds);
        const month = dateObject.toLocaleString('en-US', { month: 'long' });
        const day = dateObject.getDate();
        const year = dateObject.getFullYear();
        this.formatDate = `${month} ${day}, ${year}`;
        console.log(this.formatDate)

        this.facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u='
            + encodeURIComponent(this.newsData.url) +
            '&amp;src=sdkpreparse';
    }

    openSource(url: string) {
        window.open(url, '_blank')
    }

    closeModal() {
        this.newsService.close()
    }
}
