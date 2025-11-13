import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin/admin';
import { Report } from 'src/app/interfaces/report.interface';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: false,
})
export class ReportsPage implements OnInit {

  reports: Report[] = [];

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.AdminService.getReports().subscribe((reports) => {
      this.reports = reports;
    });
  }

}
