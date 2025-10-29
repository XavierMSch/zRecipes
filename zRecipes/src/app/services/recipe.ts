import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  private recipes: Recipe[] = [
    { id: 1, name: 'Apple Frangipone Tart', description: 'La Apple Frangipane Tart es un postre británico con base crujiente de galletas, frangipane de almendra y finas rodajas de manzana. Se hornea con almendras laminadas hasta dorar y se disfruta tibia con crema o helado.', bannerImg: '../../../assets/images/apple_frangipane_tart.png', ingredients: [], steps: [], author: '', isFork: false, parentRecipe: 0, numLikes: 0, numSaved: 0},
    { id: 2, name: 'Speedy Chicken Stir-Fry', description: 'This quick and flavorful stir-fry is perfect for a weeknight meal. Tender chicken pieces are cooked with an assortment of crisp vegetables in a savory soy-ginger sauce, all ready in under 30 minutes!', bannerImg: '../../../assets/images/speedy_chiken_stir-fry.png', ingredients: [], steps: [], author: '', isFork: false, parentRecipe: 0, numLikes: 0, numSaved: 0},
    { id: 3, name: 'Creamy Tomato Pasta', description: 'Indulge in this rich and comforting creamy tomato pasta. Al dente pasta is tossed in a velvety sauce made with ripe tomatoes, a touch of cream, and fresh herbs, guaranteed to satisfy your cravings.', bannerImg: '../../../assets/images/creamy_tomato_pasta.png', ingredients: [], steps: [], author: '', isFork: false, parentRecipe: 0, numLikes: 0, numSaved: 0},
    { id: 4, name: 'Hearty Lentil Soup', description: "Warm up with a bowl of this wholesome and satisfying lentil soup. Packed with nutritious lentils, vegetables, and aromatic spices, it's a perfect meal for a chilly day.", bannerImg: '../../../assets/images/hearty_lentil_soup.png', ingredients: [], steps: [], author: '', isFork: false, parentRecipe: 0, numLikes: 0, numSaved: 0},
    { id: 5, name: 'Baked Salmon with Asparagus', description: 'Enjoy a light and healthy meal with this easy baked salmon and asparagus. Flaky salmon fillets are seasoned and baked alongside tender asparagus spears, a delicious and nutritious option.', bannerImg: '../../../assets/images/baked_salmon_with_asparagus.png', ingredients: [], steps: [], author: '', isFork: false, parentRecipe: 0, numLikes: 0, numSaved: 0},
    { id: 6, name: 'Decadent Chocolate Lava Cakes', description: 'Treat yourself to these irresistible chocolate lava cakes. With a rich, warm, and gooey chocolate center, these individual desserts are surprisingly easy to make and perfect for any special occasion.', bannerImg: '../../../assets/images/decadent_chocolate_lava_cake.png', ingredients: [], steps: [], author: '', isFork: false, parentRecipe: 0, numLikes: 0, numSaved: 0}
  ];

  private favoriteCategories = [
    {
      id: 1,
      title: 'Postres',
      image: 'https://www.themealdb.com/images/media/meals/wxyvqq1511723401.jpg',
    },
    {
      id: 2,
      title: 'Desayunos',
      image: 'https://www.themealdb.com/images/media/meals/0206h11699013358.jpg',
    },
    {
      id: 3,
      title: 'Almuerzos',
      image: 'https://www.themealdb.com/images/media/meals/020z181619788503.jpg',
    },
    {
      id: 4,
      title: 'Carnes',
      image: 'https://www.themealdb.com/images/media/meals/lhqev81565090111.jpg',
    },
    {
      id: 5,
      title: 'Sopas',
      image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
    },
    {
      id: 6,
      title: 'Chocolates',
      image: 'https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg',
    }
  ]
  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes;
  }
  getFavoriteCategories() {
    return this.favoriteCategories;
  }

  searchRecipesByName(name: string): Recipe[] {
    return this.recipes.filter(recipe => recipe.name.includes(name));
  }
}
