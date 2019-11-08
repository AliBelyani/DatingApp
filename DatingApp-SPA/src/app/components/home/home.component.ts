import { Component, OnInit } from '@angular/core';

import { ValueTable } from './value-table';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  values: ValueTable[];
  value: ValueTable;
  id: number;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  onLoadValues() {
    this.homeService.getValues().subscribe(
      (res: ValueTable[]) => {
        this.values = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  onLoadValue() {
    if (this.id !== undefined) {
      this.homeService.getValue(this.id).subscribe(
        (res: ValueTable) => {
          this.value = res;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
