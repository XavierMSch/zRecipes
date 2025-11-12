import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../../interfaces/report.interface';
import { AuthService } from '../../services/auth/auth';
import { AdminService } from '../../services/admin/admin';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  standalone: false,
})
export class ReportListComponent  implements OnInit {
  @Input() reports: Report[] = [];

  constructor() { }

  ngOnInit() {
    
  } 

  getReports() {
    
  }

}
