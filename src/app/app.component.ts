import { Component } from '@angular/core';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FavoritesComponent, ListComponent],
  template: `
    <div class="container py-4">
      <div class="text-center mb-4">
        <button class="btn btn-gradient" (click)="reload()">
          <i class="bi bi-house-fill me-2"></i>
          Home
        </button>
      </div>

      <app-favorites></app-favorites>

      <app-list></app-list>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
    }
  `]
})
export class AppComponent {
  title = 'sc3';

  reload() {
    window.location.reload();
  }
}