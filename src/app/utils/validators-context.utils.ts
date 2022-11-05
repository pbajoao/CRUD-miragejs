import { AbstractControl, ValidationErrors } from '@angular/forms';
import CpfUtils from './cpf-validators.utils';
import DataNascUtils from './dataNasc-validators.utils';
import EmailUtils from './email-validators.utils';

export default class ValidatorsContext {
    static cpf(control: AbstractControl): ValidationErrors | null {
        if (!CpfUtils.isValid(control.value)) {
            return { cpf: 'CPF inválido' };
        }
        return null;
    }

    static email(control: AbstractControl): ValidationErrors | null {
        if (!EmailUtils.isValid(control.value)) {
            return { email: 'E-mail inválido' };
        }
        return null;
    }

    static dataNasc(control: AbstractControl): ValidationErrors | null {
        if (!DataNascUtils.isValid(control.value)) {
            return { dataNascimento: 'Data inválida' };
        }
        return null;
    }
}
