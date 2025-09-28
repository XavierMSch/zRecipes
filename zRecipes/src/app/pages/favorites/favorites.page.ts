import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})


export class FavoritesPage implements OnInit {
  favoriteRecipes = [
    {
      id: 1,
      title: 'Postres',
      image: 'https://www.themealdb.com/images/media/meals/wxyvqq1511723401.jpg',
      recetas: [
        { name: 'Pasta', description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.' },
      ]
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


  ];

  constructor() { }

  ngOnInit() {
  }

}
