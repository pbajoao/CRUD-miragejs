import { DataNascimentoValidContext } from '../models/utils/dataNascimento-validator.model';

export default class DataNascUtils {

  static isValid(dataNascimento: string): boolean {
    if (dataNascimento.length === 10) {
      const data: Array<String> = dataNascimento.split('/');
      const dataContext = new DataNascimentoValidContext(
        data,
        1900,
        this.isLeapYear(Number(data[2])),
        this.isAcceptableAge(data)
      );

      if (dataContext.isLeapYear) { dataContext.daysMonth[1] = 29; }

      if (dataContext.year > dataContext.minYear && dataContext.isAcceptableAge) {
        if (dataContext.month > 0 && 12 >= dataContext.month) {
          if (dataContext.day > 0 && dataContext.daysMonth[dataContext.month - 1] >= dataContext.day) {
            return true;
          }
        }
      }
    }
    return false;
  }

  static isLeapYear(year: number): boolean {
    if (year % 4 == 0) {
      return true;
    }
    return false;
  }

  static isAcceptableAge(dataNascimento: any): boolean {
    const currentData = new Date();

    if (currentData.getFullYear() - Number(dataNascimento[2]) > 16) {
      return true;
    } else if (currentData.getFullYear() - Number(dataNascimento[2]) === 16) {
      if (currentData.getMonth() + 1 > Number(dataNascimento[1])) {
        return true;
      } else if (currentData.getMonth() + 1 === Number(dataNascimento[1])) {
        if (currentData.getDate() >= Number(dataNascimento[0])) {
          return true;
        }
      }
    }
    return false;
  }
}
