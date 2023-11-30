import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LOTTERY } from 'src/app/models/lottery';
import { LotteryService } from 'src/app/services/lottery.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lotteryEntryForm!:FormGroup;
  lotForm!:FormGroup;
  lotteryArray:any[] = [];
  storedLotteryNumber1:any;
  storedLotteryNumber2:any;
  storedLotteryNumber3:any;
  isReadOnly:boolean = false;
 
  lotteries_List!:any;
  timeEntries:any;
  isLoading:boolean = false;
  page = 1;
	pageSize = 4;
  lotteries:any

  constructor(private fb: FormBuilder,
    private el: ElementRef,private lotteryService:LotteryService) { }

  ngOnInit(): void {
    
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

    
    this.getAllLotteryInfo();
    this.getLotteryValues();
    // this.refreshCountries()
  }


 

  getLotteryValues(){

    
    let dataInitial:any = localStorage?.getItem('lottery_No')||null;
    
    let initArray:any = JSON.parse(dataInitial);
    this.lotForm.patchValue({
      textbox1: initArray[0],
      textbox2: initArray[1],
      textbox3: initArray[2],
      textbox4: initArray[3],
    })
  
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


  /* refreshCountries() {
		this.lotteries = this.lotteries_List.map((Date, i) => ({ id: i + 1, ...Date })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	} */

  getAllLotteryInfo(){
    this.lotteryService.getAllLotteries().subscribe({
      next:(res:any)=>{
      console.log(res,"all lotteries");
      this.lotteries_List = res.data;

      this.lotteries_List.sort((a:any, b:any) => new Date(b.Time).getTime() - new Date(a.Time).getTime())
          
    if(localStorage.getItem('lottery_No') === null && 
        localStorage.getItem('sub_Lottery_No')=== null &&
        localStorage.getItem('sub_Lottery_No1') === null &&
        localStorage.getItem('sub_Lottery_No2') === null
     ){
     if(this.lotteries_List){
      let splitNo = this.lotteries_List[0].lottery_Number.split('');
      console.log(splitNo);
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
  }
    })
  }

  autoMoveEvent(e:any,p:any,c:any,n:any){
    var length = c.value.length;
    var maxLength = c.getAttribute('maxlength');
    if(length == maxLength){
      if(n!==''){ n.focus(); }
      this.lotteryArray.push(c.value)
      localStorage.setItem('lottery_No',JSON.stringify(this.lotteryArray))
      let data:any = localStorage.getItem('lottery_No');
      this.storedLotteryNumber1 = JSON.parse(data)
      if(n===''){
        this.isReadOnly = true
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
        }
      }
  }


  onSubmitLottery(formData:any){
    this.isLoading = true
    const { textbox1, textbox2, textbox3, textbox4 } = this.lotForm.value;
    this.lotteryEntryForm.value.lottery_Number = `${textbox1}${textbox2}${textbox3}${textbox4}`;
    console.log(formData);
    console.log(this.lotteryEntryForm.value);
    this.isReadOnly = false;
     this.lotteryService.saveLottery(this.lotteryEntryForm.value).subscribe((res:any)=>{
      console.log(res);
      alert(res.message)
      this.getAllLotteryInfo();
      this.isLoading= false;
    })  
    // console.log(this.lotteryArray,"array");
  }
}
