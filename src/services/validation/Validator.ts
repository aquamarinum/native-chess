import {SignStatuses} from './SignStatuses';

export class Validator {
  private value: string;
  private status: SignStatuses;
  constructor(val: string) {
    this.value = val;
    this.status = SignStatuses.SUCCESS;
  }
  notEmpty() {
    if (this.status === SignStatuses.SUCCESS) {
      if (this.value.length === 0 || this.value.includes(' '))
        this.status = SignStatuses.EMPTY;
    }
    return this;
  }
  minLength(min: number) {
    if (this.status === SignStatuses.SUCCESS) {
      if (this.value.length < min) this.status = SignStatuses.NOTENOUGH;
    }
    return this;
  }
  maxLength(max: number) {
    if (this.status === SignStatuses.SUCCESS) {
      if (this.value.length >= max) this.status = SignStatuses.OVERFLOW;
    }
    return this;
  }
  matchMail() {
    if (this.status === SignStatuses.SUCCESS) {
      if (!this.value.match(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/))
        this.status = SignStatuses.BADEMAIL;
    }
    return this;
  }
  matchPassword() {
    if (this.status === SignStatuses.SUCCESS) {
      if (!this.value.match(/[a-zA-Z0-9]/))
        this.status = SignStatuses.BADPASSWORD;
    }
    return this;
  }
  getStatus() {
    return this.status;
  }
}
