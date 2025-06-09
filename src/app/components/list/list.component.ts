import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post, PostCategory } from '../../models/post';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  template: `
    <div>
      <h1 class="gradient-text text-center mb-4">
        <i class="bi bi-journal-text me-2"></i>
        Post
      </h1>

      <div class="text-center mb-4">
        <button 
          class="btn btn-outline-modern me-2 mb-2"
          [class.active]="selectedCategory === null"
          (click)="resetCategoria()">
          <i class="bi bi-grid-fill me-1"></i>
          Tutti
        </button>
        <button 
          *ngFor="let category of categories"
          class="btn btn-outline-modern me-2 mb-2"
          [class.active]="selectedCategory?.id === category.id"
          (click)="cambiaCategoria(category)">
          <i class="bi bi-tag-fill me-1"></i>
          {{ category.title }}
        </button>
      </div>

      <div class="row">
        <div *ngFor="let post of getPostsToShow()" class="col-lg-6 col-xl-4 mb-4">
          <app-post [post]="post" [categories]="categories"></app-post>
        </div>
      </div>

      <div *ngIf="getPostsToShow().length === 0" class="text-center py-5">
        <i class="bi bi-search display-4 text-muted mb-3"></i>
        <p class="text-muted">Nessun post trovato per questa categoria.</p>
      </div>
    </div>
  `
})
export class ListComponent implements OnInit {
  posts: Post[] = [];
  selectedCategory: PostCategory | null = null;
  posts_filtered: Post[] = [];
  categories: PostCategory[] = [];
  
  postService = inject(PostService);

  ngOnInit(): void {
    this.postService.getPosts().subscribe(response => {
      this.posts = response.posts;
      this.categories = response.postCategories;
    });
  }

  cambiaCategoria(category: PostCategory) {
    this.posts_filtered = this.posts.filter(post => post.category === category.id);
    this.selectedCategory = category;
  }

  resetCategoria() {
    this.selectedCategory = null;
    this.posts_filtered = [];
  }

  getPostsToShow(): Post[] {
    return this.selectedCategory ? this.posts_filtered : this.posts;
  }
}