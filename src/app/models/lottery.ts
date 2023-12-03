
export class LOTTERY {
    Date!: Date;
    Time!: Date;
    lottery_Number!: string

    constructor(Date:Date,Time:Date,lottery_Number:string){
        this.Date = Date;
        this.Time = Time;
        this.lottery_Number = lottery_Number
    }
}