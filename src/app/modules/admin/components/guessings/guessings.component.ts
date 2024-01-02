import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { Subject, debounceTime } from 'rxjs';
import { GuessingService } from 'src/app/services/guessing.service';

@Component({
  selector: 'app-guessings',
  templateUrl: './guessings.component.html',
  styleUrls: ['./guessings.component.scss']
})
export class GuessingsComponent implements OnInit {
  guessingDigitFForm!:FormGroup;
  public pagination:number = 1;
  public totalRecords = 0 ;
  public pageSizes = [5,10,15];
  public isItemsPerPage = 5;
  reverse:boolean = false;
  sortOrder: 'asc' | 'desc' = 'desc';
  searchTerm:string = "";
  guessingInfo:any;
  isLoading:boolean = false;

  constructor(private fb:FormBuilder,
              private guessingService:GuessingService,
              private toast: NgToastService,
              private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle("Guessings")
    this.guessingDigitFForm = this.fb.group({
      Date: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US')],
      Time: [new Date()],
      GuessingNumber_3digit: [""],
      GuessingNumber_4digit: [""]
    });
    this.getGuessingNo();
  }

  
  getGuessingNo(){
    this.guessingService.getGuessingNumber(this.pagination,this.isItemsPerPage,this.sortOrder,"Time",
      this.searchTerm).subscribe({
      next: (res:any)=>{
      this.guessingInfo = res.data;
      this.totalRecords = res.data.total;
      this.getGuessingData(res.data.guessdigitInfo[0]);
      },
      error:err=>{
        this.toast.error({detail:"ERROR",summary: err,duration:5000,sticky:false,position:'topRight'});
      }
    })
  }

  getGuessingData(info:any){
      this.guessingDigitFForm.patchValue({
        GuessingNumber_3digit: info.GuessingNumber_3digit,
        GuessingNumber_4digit: info.GuessingNumber_4digit
      })
  }

  formatThreeGuessing(event:any)
  {
    let amountEntered = event.target.value.replace(/,/g, '');
    if (amountEntered) {
      let convertedValue = amountEntered.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.guessingDigitFForm.controls['GuessingNumber_3digit'].setValue(convertedValue);
    }
  }

  formatFourGuessing(event:any)
  {
    let amountEntered = event.target.value.replace(/,/g, '');
    if (amountEntered) {
      let convertedValue = amountEntered.replace(/\B(?=(\d{4})+(?!\d))/g, ',');
      this.guessingDigitFForm.controls['GuessingNumber_4digit'].setValue(convertedValue);
    }
  }

  onSubmitGuessing(formData:any){
      this.isLoading = true;
      this.guessingDigitFForm.get('GuessingNumber_3digit')?.value.replace(/,/g, '');
        console.log(formData);
       this.guessingService.saveGuessingNumber(this.guessingDigitFForm.value).subscribe({
        next:(res:any)=>{
        this.isLoading = false;
        this.guessingService.getLoadData();
        this.toast.success({detail:"SUCCESS",summary: res.message,duration:5000,sticky:false,position:'topRight'})
        this.getGuessingNo();
       },
        error:error =>{
          this.toast.error({detail:"SUCCESS",summary: error,duration:5000,sticky:false,position:'topRight'})
        }
      })
  }

  onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

}
