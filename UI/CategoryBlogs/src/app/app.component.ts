import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesListComponent } from './features/category/categories-list/categories-list.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HomeComponent } from './core/components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CategoryBlogs';
}
