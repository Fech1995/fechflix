import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formDataSubject = new Subject<any>();

  getFormDataObservable() {
    console.log(this.formDataSubject.asObservable())
    return this.formDataSubject.asObservable();
  }

  sendFormData(formData: any) {
    console.log(formData)
    this.formDataSubject.next(formData);
  }
}

