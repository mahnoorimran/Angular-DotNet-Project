import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AddCategoryModel } from '../../models/add-category-model';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  
  model! : AddCategoryModel;
  categorySubscription?: Subscription;

  constructor(private categoryService: CategoryService,
    private router:Router
   ) {
    this.buildForm();
  }
  
  buildForm() {
    this.model = {
      name: '',
      urlHandle: ''
    };
    
  }

  onSubmit() {
      // Handle form submission
      console.log(this.model);
      this.categorySubscription=this.categoryService.addCategory(this.model).subscribe({
        next: () => {
          console.log('Category added successfully');
          this.router.navigate(['/list-categories']);

          
        }
      });
  }
  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
    // Clean up any subscriptions to prevent memory leaks
    console.log('AddCategoryComponent destroyed');
    

  }
}
