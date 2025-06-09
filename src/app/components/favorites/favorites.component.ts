import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  postService = inject(PostService);
}