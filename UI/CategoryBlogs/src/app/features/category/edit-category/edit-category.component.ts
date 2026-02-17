import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy {
  id:string |null = null; 
  paramsSubscription!: Subscription;
  categoryData!: CategoryModel;
 
  constructor(private categoryService: CategoryService,
    private route:ActivatedRoute,
    private router:Router
    ) //Reading id from URL we use activatedRoute 
  {}
  

  ngOnInit(): void {
    this.getCategoryId();
  }

  //Get Category by ID using route param
  getCategoryId() {
  this.paramsSubscription=this.route.paramMap.subscribe({
      next: (params) => {
        this.id=params.get('id');
        console.log('Fetched Category ID :', params.get('id'));
        if(this.id){
          this.categoryService.getCategoryById(this.id).subscribe({
            next:(response)=>{
              this.categoryData=response;
              console.log('Fetched Category Data:', this.categoryData);


            }
          });
        }
      }
    });
  }
  onUpdate(){
    console.log('Update Category button clicked',this.categoryData);
    if(this.id)
    {
    this.categoryService.updateCategory(this.id, this.categoryData).subscribe({
      next: () => {
        console.log('Category updated successfully');
        this.router.navigate(['/list-categories']);
      },
      error: (error) => {
        console.error('Error updating category:', error);
      }
    });
  }
  }
  onDelete() {
    if(this.id){
      this.categoryService.deleteCategory(this.id).subscribe({
        next: () => {
          console.log('Category deleted successfully');
          this.router.navigate(['/list-categories']);
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        }
      });
    }

  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    
    console.log('EditCategoryComponent destroyed');
  }


}
