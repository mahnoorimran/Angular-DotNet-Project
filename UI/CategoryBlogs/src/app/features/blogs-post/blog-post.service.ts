import { Injectable } from '@angular/core';
import { AddBlogPostModel } from './models/add-blogpost-model';
import { Observable } from 'rxjs';
import { BlogPostModal } from './models/blog-post-modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }

  addBlogPost(data:AddBlogPostModel):Observable<BlogPostModal>{
    return this.http.post<BlogPostModal>(`${environment.apibaseUrl}/api/BlogPosts`, data);
  }
  getBlogPosts():Observable<BlogPostModal[]>{
    return this.http.get<BlogPostModal[]>(`${environment.apibaseUrl}/api/BlogPosts`);
  }
}
