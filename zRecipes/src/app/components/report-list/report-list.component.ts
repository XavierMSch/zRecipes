import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Report } from '../../interfaces/report.interface';
import { ReportDetailComponent } from '../report-detail/report-detail.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  standalone: false,
})
export class ReportListComponent  implements OnInit {
  @Input() reports: Report[] = [];

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    
  } 

  async onReportClick(report: Report) {
    const modal = await this.modalCtrl.create({
      component: ReportDetailComponent,
      componentProps: {
        report: report
      }
      
    });
    await modal.present();
  }

}
