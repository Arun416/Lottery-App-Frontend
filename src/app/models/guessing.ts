
export class LOTTERY {
    Date!: Date;
    Time!: Date;
    GuessingNumber_3digit!: string;
    GuessingNumber_4digit!: string

    constructor(Date:Date,Time:Date,GuessingNumber_3digit:string,
        GuessingNumber_4digit:string){
        this.Date = Date;
        this.Time = Time;
        this.GuessingNumber_3digit =  GuessingNumber_3digit;
        this.GuessingNumber_4digit =  GuessingNumber_4digit;
    }
}