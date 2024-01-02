import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { GuessingService } from 'src/app/services/guessing.service';

@Component({
  selector: 'app-guess-table',
  templateUrl: './guess-table.component.html',
  styleUrls: ['./guess-table.component.scss']
})
export class GuessTableComponent implements OnInit,OnDestroy {
  public pagination:number = 1;
  public totalRecords = 0 ;
  public pageSizes = [5,10,15];
  public isItemsPerPage = 5;
  reverse:boolean = false;
  sortOrder: 'asc' | 'desc' = 'desc';
  searchTerm:string = "";
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 300;
  guessingInfo:any;
  private postRequestSubscription!: Subscription;
  
  constructor(private guessingService:GuessingService,
              private toast:NgToastService) { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.onSearch(searchValue);
    });
    this.getGuessingData();
    this.postRequestSubscription = this.guessingService.triggeringData().subscribe(() => {
      this.getGuessingData();
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
    this.postRequestSubscription.unsubscribe();
  }

  getGuessingData(){
    this.guessingService.getGuessingNumber(this.pagination,this.isItemsPerPage,this.sortOrder,"Time",
      this.searchTerm).subscribe({
      next: (res:any)=>{
      this.guessingInfo = res.data;
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
    this.getGuessingData();
  }

  onTablePageChange(page: any){    
    this.pagination = page
    this.getGuessingData();
  }

  onTableSizesChange (event:any): void{
      this.isItemsPerPage = event.target.value;
      this.pagination = 1;
      this.getGuessingData();
  }

  onSearchLottery(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  onSearch(searchValue:string){
    this.searchTerm = searchValue;
    this.getGuessingData();
  }

  shouldBreakLine(text: string): boolean {
    return text.length>=10;
  }
  
}
