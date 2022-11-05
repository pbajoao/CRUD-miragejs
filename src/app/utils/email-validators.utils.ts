export default class EmailUtils {

  static isValid(email: string): boolean {
    let regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

    if (email.indexOf('@') > -1 && email.split('@')[1].indexOf('.') > -1) {
      if (!regMail.test(email)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
