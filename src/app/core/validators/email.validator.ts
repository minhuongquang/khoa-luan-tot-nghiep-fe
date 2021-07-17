import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export const customEmailValidator: ValidationErrors = (control: AbstractControl) => {
  if (!control.value) {
    return null;
  }
  return Validators.email(control);
};
