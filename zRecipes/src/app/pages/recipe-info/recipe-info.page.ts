import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.page.html',
  styleUrls: ['./recipe-info.page.scss'],
  standalone: false,
})
export class RecipeInfoPage implements OnInit {
  favorite: boolean = false;
  liked: boolean = false;
  defaultIcons: string[] = [
    'bookmark-outline',
    '../../../assets/icon/chef-outline.png',
    '../../../assets/icon/cookie-outline.png'
  ];
  selectionIcons: string[] = [
    'bookmark',
    '../../../assets/icon/chef.png',
    '../../../assets/icon/cookie.png'
  ]
  currentIcons: string[] = [
    'bookmark-outline',
    '../../../assets/icon/chef-outline.png',
    '../../../assets/icon/cookie-outline.png'
  ]
  ingredients: string[] = [
    '175 g de galletas digestive',
    '75 g de mantequilla sin sal derretida',
    '200 g de manzanas Bramley (peladas y en láminas finas)',
    '75 g de mantequilla sin sal',
    '75 g de azúcar caster',
    '2 huevos',
    '75 g de almendras molidas',
    '1 cucharadita de extracto de almendra',
    '50 g de almendras laminadas'
  ];
  steps: string[] = [
    'Precalienta el horno a 200 °C (180 °C con ventilador) o gas 6. Tritura las galletas hasta obtener migas finas. Mézclalas con la mantequilla derretida y cubre la base y los lados de un molde. Refrigera mientras haces el relleno.',
    'Bate la mantequilla con el azúcar hasta que esté suave y esponjosa. Agrega los huevos poco a poco, luego incorpora las almendras molidas y el extracto de almendra hasta obtener una crema homogénea.',
    'Pela y corta las manzanas en láminas finas. Colócalas sobre la base de galleta. Cubre con la mezcla de frangipane, alisa la superficie y espolvorea con las almendras laminadas.',
    'Hornea durante 20–25 minutos, hasta que esté dorada y firme. Deja enfriar 15 minutos antes de retirar con cuidado el aro del molde.',
    'Pasa la tarta a un plato y acompaña con crema, crème fraîche o helado.'
  ];
  constructor() { }

  onMouseEnterFavorite() {
    this.currentIcons[0] = this.selectionIcons[0];
  }

  onMouseLeaveFavorite() {
    if (!this.favorite) {
      this.currentIcons[0] = this.defaultIcons[0];
    }
  }

  onMouseEnterFork() {
    this.currentIcons[1] = this.selectionIcons[1];
  }

  onMouseLeaveFork() {
    this.currentIcons[1] = this.defaultIcons[1];
  }

  onMouseEnterLike() {
    this.currentIcons[2] = this.selectionIcons[2];
  }

  onMouseLeaveLike() {
    if (!this.liked) {
      this.currentIcons[2] = this.defaultIcons[2];
    }
  }

  onClickFavorite() {
    this.favorite = !this.favorite;
    if (this.favorite) {
      this.currentIcons[0] = this.selectionIcons[0];
    } else {
      this.currentIcons[0] = this.defaultIcons[0];
    }
  }

  onClickLike() {
    this.liked = !this.liked;
    if (this.liked) {
      this.currentIcons[2] = this.selectionIcons[2];
    } else {
      this.currentIcons[2] = this.defaultIcons[2];
    }
  }

  ngOnInit() {
  }

}
