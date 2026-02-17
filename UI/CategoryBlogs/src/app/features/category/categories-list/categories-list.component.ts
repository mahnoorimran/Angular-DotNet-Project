import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { CategoryModel } from '../../models/category-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit {
  categories$!: Observable<CategoryModel[]>;
  
  constructor(private router:Router,
  private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onAddCategory(){
    console.log('Add Category button clicked');
    this.router.navigate(['/add-category']);
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

}
