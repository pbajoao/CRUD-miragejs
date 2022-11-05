export class DataNascimentoValidContext {
    data: Array<String>;
    minYear: number;
    isLeapYear: boolean;
    isAcceptableAge: boolean;
    day: number;
    month: number;
    year: number; 
    daysMonth: Array<Number>;

    constructor(
        data: Array<String>,
        minYear: number,
        isLeapYear: boolean,
        isAcceptableAge: boolean
    ) {
        this.data = data;
        this.minYear = minYear;
        this.isLeapYear = isLeapYear;
        this.isAcceptableAge = isAcceptableAge;
        this.day = Number(data[0]);
        this.month = Number(data[1]);
        this.year = Number(data[2]);
        this.daysMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
}