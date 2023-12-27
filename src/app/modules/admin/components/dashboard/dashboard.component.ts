import { formatDate } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { Subject, debounceTime } from 'rxjs';
import { LOTTERY } from 'src/app/models/lottery';
import { AuthService } from 'src/app/services/auth.service';
import { LotteryService } from 'src/app/services/lottery.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy  {
  lotteryEntryForm!:FormGroup;
  lotForm!:FormGroup;
  lotteryArray:LOTTERY[] = [];
  public pagination:number = 1;
  public totalRecords = 0 ;
  public pageSizes = [5,10,15];
  public isItemsPerPage = 5;
  reverse:boolean = false;
  sortOrder: 'asc' | 'desc' = 'desc';
  searchTerm:string = "";
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 300;
  storedLotteryNumber1:any;
  storedLotteryNumber2:any;
  storedLotteryNumber3:any;
  isReadOnly:boolean = false;
  lotteries_List!:any;
  isLoading:boolean = false;
  currentUser:any = "";

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private lotteryService:LotteryService,
    private authServ:AuthService,
    private toast: NgToastService,
    private title:Title) {
  }

  ngOnInit(): void {
    this.title.setTitle("Dashboard")
    this.lotForm = this.fb.group({
        textbox1: [''],
        textbox2: [''],
        textbox3: [''],
        textbox4: [''],
        textbox5: [''],
        textbox6: [''],
        textbox7: [''],
        textbox8: [''],
        textbox9: [''],
        textbox10:['']
    })

    this.lotteryEntryForm = this.fb.group({
      Date: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US')],
      // Date: [new Date().toISOString().slice(0, -1)],
      Time : [new Date()],
      lottery_Number: ['']
    }) 

    this.getLottery();
    this.getLotteryValues();
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.onSearch(searchValue);
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  getLotteryValues(){

    let dataInitial:any = localStorage.getItem('lottery_No')||null;
    
    let initArray:any = JSON.parse(dataInitial);
    if(dataInitial!== null){
    this.lotForm.patchValue({
      textbox1: initArray[0],
      textbox2: initArray[1],
      textbox3: initArray[2],
      textbox4: initArray[3],
    })
    }
    let subArray1:any = localStorage?.getItem('sub_Lottery_No')||null;
    this.storedLotteryNumber1 = JSON.parse(subArray1);
    this.lotForm.patchValue({
      textbox5: this.storedLotteryNumber1[0],
      textbox6: this.storedLotteryNumber1[1],
      textbox7: this.storedLotteryNumber1[2],
    })
  
    let subArray2:any = localStorage.getItem('sub_Lottery_No1')||null;
    this.storedLotteryNumber2 = JSON.parse(subArray2)
    this.lotForm.patchValue({
      textbox8: this.storedLotteryNumber2[0],
      textbox9: this.storedLotteryNumber2[1],
    })

    let subArray3:any = localStorage.getItem('sub_Lottery_No2')||null;
    this.storedLotteryNumber3 = JSON.parse(subArray3)
    this.lotForm.patchValue({          
      textbox10:this.storedLotteryNumber3[0]
    }) 
  }


  allowNumericValues(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getLottery(){
    this.lotteryService.getAllLotteries(this.pagination,
      this.isItemsPerPage,
      'Time',
      this.sortOrder,
      this.searchTerm).subscribe({
      next:(res:any)=>{
        this.lotteries_List = res.data.lotteries;
        this.totalRecords = res.data.total;
        this.getAllLotteryInfo(res.data.lotteries)
      },
      error:err=>{
        console.log(err,"unauthorized");
       /*  if(err==="Token expired"){
          this.authServ.logout()
        }  */
      }
    })
  }

  getAllLotteryInfo(lotteries_List:any){
         
    if(localStorage.getItem('lottery_No') === null && 
        localStorage.getItem('sub_Lottery_No')=== null &&
        localStorage.getItem('sub_Lottery_No1') === null &&
        localStorage.getItem('sub_Lottery_No2') === null
     ){
     if(lotteries_List){
      let splitNo = lotteries_List[0].lottery_Number.split('');
      localStorage.setItem('lottery_No',JSON.stringify(splitNo))
      let data:any = localStorage.getItem('lottery_No');
      this.storedLotteryNumber1 = JSON.parse(data)
      this.lotForm.patchValue({
        textbox1: this.storedLotteryNumber1[0],
        textbox2: this.storedLotteryNumber1[1],
        textbox3: this.storedLotteryNumber1[2],
        textbox4: this.storedLotteryNumber1[3],
     })


     for(let i=0; i<=this.storedLotteryNumber1.length;i++){
      if(i === this.storedLotteryNumber1.length){
      this.storedLotteryNumber1.shift();
      this.lotForm.patchValue({
        textbox5: this.storedLotteryNumber1[0],
        textbox6: this.storedLotteryNumber1[1],
        textbox7: this.storedLotteryNumber1[2],
      })
    }
    }

       localStorage.setItem('sub_Lottery_No',JSON.stringify(this.storedLotteryNumber1))
        let data1:any = localStorage.getItem('sub_Lottery_No');
        this.storedLotteryNumber2 = JSON.parse(data1)
        for(let i=0; i<=this.storedLotteryNumber2.length;i++){
          if(i===this.storedLotteryNumber2.length){
            this.storedLotteryNumber2.shift();
            this.lotForm.patchValue({
              textbox8: this.storedLotteryNumber2[0],
              textbox9: this.storedLotteryNumber2[1],
            })
        }
      }

      localStorage.setItem('sub_Lottery_No1',JSON.stringify(this.storedLotteryNumber2))
      let dataLast:any = localStorage.getItem('sub_Lottery_No1');
      this.storedLotteryNumber3 = JSON.parse(dataLast)
      for(let i=0; i<=this.storedLotteryNumber3.length;i++){
        if(i===this.storedLotteryNumber3.length){
          this.storedLotteryNumber3.shift();
          this.lotForm.patchValue({
            
            textbox10:this.storedLotteryNumber3[0]
          })
        }
      }

      localStorage.setItem('sub_Lottery_No2',JSON.stringify(this.storedLotteryNumber3))
      let dataL:any = localStorage.getItem('sub_Lottery_No2');
      this.storedLotteryNumber3 = JSON.parse(dataL);
    }
    }

      this.lotForm.valueChanges.subscribe((editValues:any) => {

        const arr1  = [editValues.textbox1,editValues.textbox2,editValues.textbox3,editValues.textbox4];
        localStorage.setItem('lottery_No',JSON.stringify(arr1));
    /*     localStorage.setItem('lottery_No',JSON.stringify(splitNo))
        let data:any = localStorage.getItem('lottery_No');
        this.storedLotteryNumber1 = JSON.parse(data)
        for(let i=0; i<=initValues.length;i++){
          if(i === this.storedLotteryNumber1.length){
          this.storedLotteryNumber1.shift();
          this.lotForm.patchValue({
            textbox5: this.storedLotteryNumber1[0],
            textbox6: this.storedLotteryNumber1[1],
            textbox7: this.storedLotteryNumber1[2],
          })
        }
        } */
      });
      /*else if(this.lotForm.value.get('textbox2').valueChanges){
      this.lotForm.value.get('textbox2').valueChanges.subscribe((newValue:any) => {
        console.log('New value:', newValue);
        this.autoMoveEvent(0,0,0,newValue)

      });
    } */
  }

  autoMoveEvent(e:any,p:any,c:any,n:any){
    var length = c.value.length;
    var maxLength = c.getAttribute('maxlength');
    if(length == maxLength){
      if(n!==''){  n.focus();  }
      this.lotteryArray.push(c.value)
      localStorage.setItem('lottery_No',JSON.stringify(this.lotteryArray))
      let data:any = localStorage.getItem('lottery_No');
      this.storedLotteryNumber1 = JSON.parse(data)
      if(n ==''){
        for(let i=0; i<=this.storedLotteryNumber1.length;i++){
        if(i === this.storedLotteryNumber1.length){
        this.storedLotteryNumber1.shift();
        this.lotForm.patchValue({
          textbox5: this.storedLotteryNumber1[0],
          textbox6: this.storedLotteryNumber1[1],
          textbox7: this.storedLotteryNumber1[2],
        })
      }
      }
     
        localStorage.setItem('sub_Lottery_No',JSON.stringify(this.storedLotteryNumber1))
        let data:any = localStorage.getItem('sub_Lottery_No');
        this.storedLotteryNumber2 = JSON.parse(data)
        for(let i=0; i<=this.storedLotteryNumber2.length;i++){
          if(i===this.storedLotteryNumber2.length){
            this.storedLotteryNumber2.shift();
            this.lotForm.patchValue({
              textbox8: this.storedLotteryNumber2[0],
              textbox9: this.storedLotteryNumber2[1],
            })
        }
      }
   
      localStorage.setItem('sub_Lottery_No1',JSON.stringify(this.storedLotteryNumber2))
      let dataLast:any = localStorage.getItem('sub_Lottery_No1');
      this.storedLotteryNumber3 = JSON.parse(dataLast)
      for(let i=0; i<=this.storedLotteryNumber3.length;i++){
        if(i===this.storedLotteryNumber3.length){
          this.storedLotteryNumber3.shift();
          this.lotForm.patchValue({
            
            textbox10:this.storedLotteryNumber3[0]
          })
        }
      }

      localStorage.setItem('sub_Lottery_No2',JSON.stringify(this.storedLotteryNumber3))
      let dataL:any = localStorage.getItem('sub_Lottery_No2');
      this.storedLotteryNumber3 = JSON.parse(dataL);

      setTimeout(()=>{this.isReadOnly=true;},600)
        }
      }
     
  }

  focusOnInput(event:any){
    if(!this.isReadOnly){
    event.target.select();
    }
  }

  onSubmitLottery(formData:any){
    this.isLoading = true
    const { textbox1, textbox2, textbox3, textbox4 } = this.lotForm.value;
    this.lotteryEntryForm.value.lottery_Number = `${textbox1}${textbox2}${textbox3}${textbox4}`;
    this.isReadOnly = false;
     this.lotteryService.saveLottery(this.lotteryEntryForm.value).subscribe({next:(res:any)=>{
      this.toast.success({detail:"SUCCESS",summary: res.message,duration:5000,sticky:false,position:'topRight'})
      this.getLottery();
      this.isLoading= false;
     },
     error:err =>{
      this.toast.error({detail:"ERROR",summary: err,duration:5000,sticky:false,position:'topRight'})
     }
    })  
  }

  sort(){
    this.reverse = !this.reverse
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.getLottery()
  }
  
  onTablePageChange(page: any){    
    this.pagination = page
    this.getLottery();
  }

  onTableSizesChange (event:any): void{
    this.isItemsPerPage = event.target.value;
    this.pagination = 1;
    this.getLottery();
}

  onSearchLottery(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  onSearch(searchValue:string){
    this.searchTerm = searchValue;
    this.getLottery();
  }
  
}
