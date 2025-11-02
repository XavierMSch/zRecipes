import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../interfaces/recipe.interface'
import { RecipeService } from 'src/app/services/recipe/recipe';
import { UserService, UserResponse } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  recipes: Recipe[] = []
  username: string = '';

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    // Obtener el nombre del usuario actual
    const token = this.authService.getCurrentAuthToken();
    if (token) {
      this.userService.getCurrentUser(token).subscribe({
        next: (user: UserResponse) => {
          this.username = user.username;
        },
        error: (error) => {
          console.error('Error al obtener usuario:', error);
        }
      });
    }
  }

  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }
}
