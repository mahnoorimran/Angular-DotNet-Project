import { Routes } from '@angular/router';
import { CategoriesListComponent } from './features/category/categories-list/categories-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogPostListComponent } from './features/blogs-post/blog-post-list/blog-post-list.component';
import { AddBlogPostComponent } from './features/blogs-post/add-blog-post/add-blog-post.component';

export const routes: Routes = [
    {
        path: 'register',
        loadComponent:
         () => import('./features/register/register.component')
         .then(m => m.RegisterComponent)//Lazy loading (less initial load) Best way to do this 
    },
    {
        path: 'login',
        component:LoginComponent//Slower (all components loaded at start)
    },
    {
        path: 'home',
        component:HomeComponent
    },
    {
        path: 'list-categories',
        component:CategoriesListComponent
    },
    {
        path: 'add-category',
        component: AddCategoryComponent
    },
    {
        path: 'edit-category/:id',
        component:EditCategoryComponent
    },
    {
        path: 'blogs-list',
        component:BlogPostListComponent
    },
    {
        path: 'add-blog-post',
        component:AddBlogPostComponent
    }
];
