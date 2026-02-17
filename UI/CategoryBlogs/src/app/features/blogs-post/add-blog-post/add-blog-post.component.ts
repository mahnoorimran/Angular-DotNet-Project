import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddBlogPostModel } from '../models/add-blogpost-model';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../blog-post.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-add-blog-post',
  imports: [CommonModule,FormsModule,MarkdownModule],
  templateUrl: './add-blog-post.component.html',
  styleUrl: './add-blog-post.component.css'
})
export class AddBlogPostComponent {
  model!:AddBlogPostModel;
  today: string = new Date().toISOString().split('T')[0]; //(T)split the string in date&time parts
  buildForm() {
    this.model = {
     
      title: '',
      shortDescription: '',
      content: '',
      featuredImgUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      imageUrl: '',
      isVisible: false

    }
  }
  
  constructor(private blogPostService:BlogPostService) {
    this.buildForm();
    
  }
  onBlogSubmit()
  {
    console.log('Blog Post submitted', this.model);
    this.blogPostService.addBlogPost(this.model).subscribe({
      next:(response)=>{
        console.log('Blog Post added successfully', response);
        this.buildForm(); 
      }
    })
  }

}
