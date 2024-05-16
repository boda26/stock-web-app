import { Routes } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    // {
    //     path: 'search',
    //     component: SearchComponent,
    //     children: [
    //         {path: 'home', component: SearchComponent},
    //         {path: ':ticker', component: ProfileComponent}
    //     ]
    // },
    {path: 'search/home', component: SearchComponent},
    {path: 'search/:ticker', component: SearchComponent},
    {path: '', redirectTo: 'search/home', pathMatch: 'full'},
    {path: 'watchlist', component: WatchlistComponent},
    {path: 'portfolio', component: PortfolioComponent},
];
