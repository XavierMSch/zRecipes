import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Report } from '../../interfaces/report.interface';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  standalone: false
})
export class ReportDetailComponent  implements OnInit {

  @Input() report!: Report;

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async goToRecipe(recipeId: number) {
    await this.modalCtrl.dismiss();
    this.router.navigate(['/recipe-info', recipeId]);
  }

}
