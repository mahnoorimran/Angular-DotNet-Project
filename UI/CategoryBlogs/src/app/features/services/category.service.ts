import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category-model';
import { AddCategoryModel } from '../models/add-category-model';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http:HttpClient) { }

  getCategories(): Observable<CategoryModel[]> {
   return this.http.get<CategoryModel[]>(`${environment.apibaseUrl}/api/Categories`);
  }

  addCategory(category: AddCategoryModel) :Observable<void> {
    return this.http.post<void>(`${environment.apibaseUrl}/api/Categories`, category);

  }
  getCategoryById(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${environment.apibaseUrl}/api/Categories/${id}`);
  }
  updateCategory(id: string, category: CategoryModel): Observable<void> {
    return this.http.put<void>(`${environment.apibaseUrl}/api/Categories/${id}`, category);
  }
  deleteCategory(id:string): Observable<void> {
    return this.http.delete<void>(`${environment.apibaseUrl}/api/Categories/${id}`);
  }
}
