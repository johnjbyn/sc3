import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post, PostCategory } from '../../models/post';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './list.component.html',
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