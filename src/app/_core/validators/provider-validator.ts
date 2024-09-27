import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function providerValidator(availableProviders: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (availableProviders.includes(control.value)) {
      return null;
    }

    return { providerValidator: true };
  }
}
