import { Component } from '@angular/core';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-root',
  imports: [FavoritesComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sc3';

  reload() {
    window.location.reload();
  }
}