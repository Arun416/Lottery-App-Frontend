import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { LotteryService } from 'src/app/services/lottery.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  lotteryResults:any[]=[];
  latestLotteryNumber:any;
  lotteryForm!:FormGroup;
  latestResultInfo:any;
  sortOrder:any = 'desc';
  sortField = 'Time'
  arrVal1:any[] = [];
  
  constructor(private lotteryService:LotteryService,
    private toast:NgToastService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.lotteryForm = this.fb.group({
        boxNo1:[''],
        boxNo2:[''],
        boxNo3:[''],
        boxNo4:[''],
        boxNo5:[''],
        boxNo6:[''],
        boxNo7:[''],
        boxNo8:[''],
        boxNo9:[''],
        boxNo10:[''],
    })
    this.getResults();
  }

  getResults(){
    this.lotteryService.getUserLotteryResults(1,10,this.sortOrder,this.sortField).subscribe({
      next:(response:any) => {
        this.lotteryResults = response.data.lotteries;
        this.latestResultInfo = response.data.lotteries[0]
        this.latestLotteryNumber = response.data.lotteries[0].lottery_Number ;
        this.patchValues(this.latestLotteryNumber)
      },
      error:error => {
        this.toast.error({detail:"ERROR",summary:error,duration:5000,position:'topRight'})
      }
    })
  }


  patchValues(lottery:any){
    this.lotteryForm.patchValue({
      boxNo1: lottery[0],
      boxNo2: lottery[1],
      boxNo3: lottery[2],
      boxNo4: lottery[3],
   })
   this.arrVal1 = lottery;
   for(let i=0; i<=this.arrVal1.length;i++){
    if(i === this.arrVal1.length){
      this.arrVal1 = lottery.split('')
      this.arrVal1.shift();
      this.lotteryForm.patchValue({
        boxNo5: this.arrVal1[0],
        boxNo6: this.arrVal1[1],
        boxNo7: this.arrVal1[2],
      })
    }
  }

  for(let i=0; i<=this.arrVal1.length;i++){
    if(i===this.arrVal1.length){
      this.arrVal1.shift();
      this.lotteryForm.patchValue({
        boxNo8: this.arrVal1[0],
        boxNo9: this.arrVal1[1],
      })
    }
  }

  for(let i=0; i<=this.arrVal1.length;i++){
    if(i===this.arrVal1.length){
      this.arrVal1.shift();      
      this.lotteryForm.patchValue({
      boxNo10:this.arrVal1[0]
      })
    }
  }
 
  }

}
