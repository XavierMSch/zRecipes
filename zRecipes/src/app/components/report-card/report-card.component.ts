import { Component, OnInit } from '@angular/core';
import { Report } from '../../interfaces/report.interface';
import { Input } from '@angular/core';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  standalone: false,
})
export class ReportCardComponent  implements OnInit {
  @Input() report!: Report;
  
  constructor() { }

  ngOnInit() {}

}

