import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { GuessingService } from 'src/app/services/guessing.service';

@Component({
  selector: 'app-guessing-table',
  templateUrl: './guessing-table.component.html',
  styleUrls: ['./guessing-table.component.scss']
})
export class GuessingTableComponent implements OnInit {

  sortField = 'Time';
  lotteryData:any[] = [];
  guessingInfo:any;
  public pagination:number = 1;
  public totalRecords = 0 ;
  public pageSizes = [5,10,15];
  public isItemsPerPage = 5;
  reverse:boolean = false;
  sortOrder: 'asc' | 'desc' = 'desc';
  searchTerm:string = "";

  constructor(private guessingService:GuessingService,
              private title:Title,private toast:NgToastService) { }

  ngOnInit(): void {
    this.title.setTitle("All Results")
    this.records();
  }
  
 
  records(){
    this.guessingService.getUserGuessingNumber(this.pagination,this.isItemsPerPage,this.sortOrder,"Time",
    this.searchTerm).subscribe({
      next: (res:any)=>{
      this.guessingInfo = res.data;
      console.log(this.guessingInfo);
      
      this.totalRecords = res.data.total;
      },
      error:err=>{
        this.toast.error({detail:"ERROR",summary: err,duration:5000,sticky:false,position:'topRight'});
      }
    })
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

  shouldBreakLine(text: string): boolean {
    console.log(text.length)
    return text.length>=10;
  }
}
