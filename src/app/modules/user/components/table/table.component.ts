import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LotteryService } from 'src/app/services/lottery.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  sortField = 'Time';
  pagination:number = 1;
  lotteryData:any[] = [];
  isItemsPerPage:number = 5;
  totalRecords:any;
  reverse:boolean = false;
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(private lotteryService:LotteryService,
              private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle("All Results")
    this.records();
  }
  
 
  records(){
    this.lotteryService.getUserLotteryResults(this.pagination,this.isItemsPerPage,this.sortOrder,this.sortField).subscribe({
      next:(response:any) => {
        this.lotteryData = response.data.lotteries
        this.totalRecords = response.data.total
      } })
  }

  sort(){
    this.reverse = !this.reverse
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.records();
  }

  onTablePageChange(page: any){    
    this.pagination = page
    this.records();
  }
}
