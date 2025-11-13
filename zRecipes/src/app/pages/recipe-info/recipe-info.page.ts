import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeListService } from 'src/app/services/recipe-list/recipe-list';
import { RecipeService } from 'src/app/services/recipe/recipe';
import { CategorySelector } from 'src/app/components/category-selector/category-selector.component';
import { Recipe } from 'src/app/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.page.html',
  styleUrls: ['./recipe-info.page.scss'],
  standalone: false,
})
export class RecipeInfoPage implements OnInit {
  favorite: boolean = false;
  currentRecipeId: number = 0;
  recipe: Recipe | null = null;
  ownerMode: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private RecipeListService: RecipeListService,
    private recipeService: RecipeService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentRecipeId = +this.route.snapshot.paramMap.get('id')!;
    this.loadRecipe(this.currentRecipeId);
    this.ownerMode = localStorage.getItem('isAdmin') === 'true';
  }

  private loadRecipe(id: number) {
      this.recipeService.getRecipe(id).subscribe({
        next: (data) => {
          this.recipe = data;
          console.log('Receta cargada:', this.recipe);
        },
        error: (err) => {
          console.error(`Error al cargar receta. RecipeID: ${id}`, err);
        }
    })
  }
  

  async openCategorySelector() {
    const modal = await this.modalCtrl.create({
      component: CategorySelector,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log('Categoría seleccionada:', data);

    if (data && data.selectedCategoryId) {
      this.addRecipeToCategory(data.selectedCategoryId, this.currentRecipeId);
    }
  }

  addRecipeToCategory(categoryId: number, recipeId: number) {
    this.RecipeListService.addRecipe(categoryId, recipeId).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Receta añadida a la categoría correctamente.',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: 'Error al añadir la receta a la categoría.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    });
  }

  onMouseEnterReport() {
    this.currentIcons[3] = this.selectionIcons[3];
  }

  onMouseLeaveReport() {
      this.currentIcons[3] = this.defaultIcons[3];
  }
  
  onMouseEnterFavorite() {
    this.currentIcons[0] = this.selectionIcons[0];
  }

  onMouseLeaveFavorite() {
    if (!this.favorite) {
      this.currentIcons[0] = this.defaultIcons[0];
    }
  }

  onMouseEnterDelete() {
    this.currentIcons[4] = this.selectionIcons[4];
  }

  onMouseLeaveDelete() {
      this.currentIcons[4] = this.defaultIcons[4];
  }

  onMouseEnterLike() {
    this.currentIcons[2] = this.selectionIcons[2];
  }

  onMouseLeaveLike() {
    if (!this.recipe?.is_liked_by_current_user) {
      this.currentIcons[2] = this.defaultIcons[2];
    }
  }

  onClickReport() {
    if (this.recipe) {
    this.recipeService.reportRecipe(this.recipe.id).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Receta reportada correctamente',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.currentIcons[3] = this.defaultIcons[3];
      },
      error: async (err) => {
        console.error('Error reporte:', err);
        const toast = await this.toastCtrl.create({
          message: 'Error al reportar receta',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    });
    }
  } 

  async onClickDelete() {
    if (!this.recipe) return;

    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar la receta "${this.recipe.name}"? Esta acción no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.deleteRecipe();
          }
        }
      ]
    });

    await alert.present();
  }

  private deleteRecipe() {
    if (!this.recipe) return;

    this.recipeService.deleteRecipe(this.recipe.id).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Receta eliminada correctamente',
          duration: 2000,
          color: 'success',
        });
        await toast.present();
        
        this.router.navigate(['/reports']);
      },
      error: async (err) => {
        console.error('Error al eliminar receta:', err);
        let errorMessage = 'Error al eliminar receta';
        
        if (err.status === 403) {
          errorMessage = 'No tienes permisos para eliminar esta receta';
        } else if (err.status === 404) {
          errorMessage = 'La receta no existe';
        }
        
        const toast = await this.toastCtrl.create({
          message: errorMessage,
          duration: 3000,
          color: 'danger',
        });
        toast.present();
      }
    });
  }

  onClickFavorite() {
    this.openCategorySelector();
    this.favorite = !this.favorite;
    if (this.favorite) {
      this.currentIcons[0] = this.selectionIcons[0];
    } else {
      this.currentIcons[0] = this.defaultIcons[0];
    }
  }

  onClickLike() {
    if (this.recipe) {
      if (this.recipe.is_liked_by_current_user) {
        this.recipeService.unlikeRecipe(this.recipe.id).subscribe({
          next: (updatedRecipe) => {
            this.recipe = updatedRecipe;
            this.currentIcons[2] = this.defaultIcons[2];
          },
          error: async (err) => {
            console.error('Error al quitar like:', err);
            const toast = await this.toastCtrl.create({
              message: 'Error al quitar el me gusta',
              duration: 2000,
              color: 'danger',
            });
            toast.present();
          }
        });
      } else {
        this.recipeService.likeRecipe(this.recipe.id).subscribe({
          next: (updatedRecipe) => {
            this.recipe = updatedRecipe;
            this.currentIcons[2] = this.selectionIcons[2];
          },
          error: async (err) => {
            console.error('Error al dar like:', err);
            const toast = await this.toastCtrl.create({
              message: 'Error al dar me gusta',
              duration: 2000,
              color: 'danger',
            });
            toast.present();
          }
        });
      }
    }
  }


   defaultIcons: string[] = [
    'bookmark-outline',
    '../../../assets/icon/chef-outline.png',
    '../../../assets/icon/cookie-outline.png',
    'flag-outline',
    'trash-outline'
  ];
   selectionIcons: string[] = [
    'bookmark',
    '../../../assets/icon/chef.png',
    '../../../assets/icon/cookie.png',
    'flag',
    'trash'
  ];
  currentIcons: string[] = [
    'bookmark-outline',
    '../../../assets/icon/chef-outline.png',
    '../../../assets/icon/cookie-outline.png',
    'flag-outline',
    'trash-outline'
  ];
}
