import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { GuessingService } from 'src/app/services/guessing.service';

@Component({
  selector: 'app-guessing-screen',
  templateUrl: './guessing-screen.component.html',
  styleUrls: ['./guessing-screen.component.scss']
})
export class GuessingScreenComponent implements OnInit {
  public pagination:number = 1;
  public totalRecords = 0 ;
  public pageSizes = [5,10,15];
  public isItemsPerPage = 5;
  reverse:boolean = false;
  sortOrder: 'asc' | 'desc' = 'desc';
  searchTerm:string = "";
  guessing_List:any;
  guessingsForm!:FormGroup;

  constructor(
    private guessingService:GuessingService,
    private toast:NgToastService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.guessingsForm = this.fb.group({
      Date:'',
      Time:'',
      GuessingNumber_3digit: '',
      GuessingNumber_4digit :''
    })
    this.getGuessingNo();
  }


  getGuessingNo(){
    this.guessingService.getUserGuessingNumber(this.pagination,this.isItemsPerPage,this.sortOrder,"Time",
      this.searchTerm).subscribe({
      next: (res:any)=>{
      this.guessing_List = res.data.guessdigitInfo[0]
      this.totalRecords = res.data.total;
      this.getGuessingData(res.data.guessdigitInfo[0]);
      },
      error:err=>{
        this.toast.error({detail:"ERROR",summary: err,duration:5000,sticky:false,position:'topRight'});
      }
    })
  }

  getGuessingData(info:any){
    this.guessingsForm.patchValue({
      GuessingNumber_3digit: info.GuessingNumber_3digit,
      GuessingNumber_4digit: info.GuessingNumber_4digit
    })
}
}
