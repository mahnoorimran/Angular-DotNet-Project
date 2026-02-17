import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostModal } from '../models/blog-post-modal';
import { BlogPostService } from '../blog-post.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
;

@Component({
  selector: 'app-blog-post-list',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.css'
})
export class BlogPostListComponent {

  blogPosts$!: Observable<BlogPostModal[]>;
  
  constructor(private blogService:BlogPostService) {}

  ngOnInit(): void {
    this.getBlogPosts();
    
  }

  getBlogPosts() {
  this.blogPosts$ = this.blogService.getBlogPosts();
  this.blogPosts$.subscribe(data => {
  console.log('Blog Posts:', data);
  });
  }
  

}
