import { HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';

export function upperCaseValidator(control: AbstractControl) {
  let regex = /[A-Z]/g;
  if (!regex.test(control.value)) {
    return {
      upperCase: true,
    };
  }
  return null;
}

export function numberValidation(control: AbstractControl) {
  let regex = /\d/g;
  if (!regex.test(control.value)) {
    return { oneNumber: true };
  }
  return null;
}

export function specialCharactorValidation(control: AbstractControl) {
  let regex = /^[a-zA-Z0-9- ]*$/;
  if (regex.test(control.value)) {
    return { specialChar: true };
  }
  return null;
}

export function passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmpassword');

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    return { mismatch: true };
  }
  return null;
}

export function changeToDate(date: any) {
  return new Date(date * 1000);
}

export function phoneNumberValidators(c: AbstractControl): any {
  let value: any;
  if (c && c.value) {
    value = c.value.replace(/\D/g, '');
    if (value.split('').length > 10 || value.split('').length < 10) {
      return { phoneNumber: true };
    } else {
      return null;
    }
  }
  return null;
}

export function resetForm(formGroup: FormGroup) {
  let control: AbstractControl = null as any;
  formGroup.reset();
  formGroup.markAsUntouched();
  Object.keys(formGroup.controls).forEach((name) => {
    control = formGroup.controls[name];
    control.setErrors(null);
  });
  formGroup.setErrors({ invalid: true });
}

export function getTokenWithHeader() {
  const token = localStorage.getItem('s_token');

  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
    'Referrer-Policy': 'no-referrer-when-downgrade',
  });
}

export function deletePropertyColumn(value: any, cols: string[]) {
  cols.forEach((col) => {
    delete value[col];
  });
}

export function leftFillNum(val: number, targetLength: number) {
  return val.toString().padStart(targetLength, '0');
}

export function createUnique(length: any) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getFirstLetter(name: any) {
  const matches: string[] = !!name ? name.match(/\b(\w)/g) : [];
  const result = matches.length > 1 ? matches.slice(0, 1) : matches;
  return !!name ? result.join('').toUpperCase() : '';
}

export function isIframe() {
  return window.location !== window.parent.location;
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
