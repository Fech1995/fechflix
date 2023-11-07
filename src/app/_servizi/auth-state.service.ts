import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  constructor() { }

  private validoSubject = new BehaviorSubject<boolean>(false);
  valido$ = this.validoSubject.asObservable();

  setValido(value: boolean) {
    this.validoSubject.next(value);
  }
}
