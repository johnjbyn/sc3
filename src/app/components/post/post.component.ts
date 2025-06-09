import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card post-card p-4 mb-4">
      <h3 class="mb-2 fw-bold">{{ post.title }}</h3>
      <span class="category-badge mb-3 d-inline-block">{{ getCategoryTitle() }}</span>
      <p class="text-secondary mb-3">{{ post.body }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">
          <i class="bi bi-calendar3 me-1"></i>
          {{ getFormattedDate() }}
        </small>
        <button 
          class="btn favorite-btn"
          [class.active]="postService.isPreferito(post)"
          (click)="toggleFavorite()">
          <i class="bi" [class.bi-heart]="!postService.isPreferito(post)" 
                        [class.bi-heart-fill]="postService.isPreferito(post)"></i>
          {{ postService.isPreferito(post) ? 'Rimuovi' : 'Aggiungi' }}
        </button>
      </div>
    </div>
  `
})
export class PostComponent {
  @Input() post!: Post;
  @Input() categories: any[] = [];
  
  postService = inject(PostService);

  toggleFavorite() {
    if (this.postService.isPreferito(this.post)) {
      this.postService.rimuoviPreferito(this.post);
    } else {
      this.postService.aggiungiPreferito(this.post);
    }
  }

  getCategoryTitle(): string {
    const category = this.categories.find(c => c.id === this.post.category);
    return category ? category.title : this.post.category;
  }

  getFormattedDate(): string {
    return new Date(this.post.date).toLocaleDateString('it-IT');
  }
}