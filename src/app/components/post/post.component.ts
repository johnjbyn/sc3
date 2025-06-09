import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
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