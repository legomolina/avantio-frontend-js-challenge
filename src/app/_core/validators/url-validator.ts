import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

// From https://regexr.com/39nr7
export const URL_PATTERN = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(control.value);

    if (URL_PATTERN.test(control.value)) {
      return null;
    }

    return { url: true };
  }
}
