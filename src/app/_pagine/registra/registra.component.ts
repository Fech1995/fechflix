import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { IRispostaServer } from 'src/app/_interfacce/IRispostaServer.interface';
import { ApiService } from 'src/app/_servizi/api.service';
import { FormDataService } from 'src/app/_servizi/form-data.service'; // Assicurati di importare il servizio correttamente

@Component({
  selector: 'app-registra',
  templateUrl: './registra.component.html',
  styleUrls: ['./registra.component.scss'],
})
export class RegistraComponent implements OnInit, OnDestroy {
  stoControllando: boolean = false;
  reactiveForm: FormGroup;
  private distruggi$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService, // Inietta il servizio FormDataService
    private api: ApiService
  ) {
    this.reactiveForm = this.fb.group({
      'nome': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      'cognome': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      'cittadinanza': ['', [Validators.minLength(2), Validators.maxLength(40)]],
      'sesso': ['', [Validators.required]],
      'codiceFiscale': ['', [Validators.required, this.codiceFiscaleValidator(), Validators.minLength(16), Validators.maxLength(16)]],
      'user': ['', [Validators.required, Validators.email]],
      'psw': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'confermaPassword': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      'cittaNascita': ['', [Validators.minLength(2), Validators.maxLength(40)]],
      'provinciaNascita': ['', [Validators.minLength(2), Validators.maxLength(40)]],
      'dataNascita': ['', [Validators.required]],
      'idNazione': ['', [Validators.required]],
      'idStato': [1, [Validators.required]],
      'gridCheck': [false, [Validators.requiredTrue]],
    }, {
      // validator: PasswordUgualiValidator('psw', 'confermaPsw')
  });
    console.log(this.reactiveForm)
  }


//---------------------------------------------------------------------------------------------------------------
// export function PasswordUgualiValidator(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];
//       if (control.value !== null && matchingControl !== null) {
//           if (control.value !== matchingControl.value) {
//               const tmp: ValidationErrors = { customPasswwordNotTheSameError: `Le password non coincidono` };
//               matchingControl.setErrors(tmp);
//               return tmp;
//           } else {
//               return null;
//           }
//       } else {
//           return null;
//       }


//   }
// }






  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.distruggi$.next();
  }

  codiceFiscaleValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const codiceFiscale = control.value;

      // Espressione regolare per il formato del Codice Fiscale italiano
      const regex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;

      if (regex.test(codiceFiscale)) {
        return null; // Codice Fiscale valido
      } else {
        return { 'invalidCodiceFiscale': true }; // Codice Fiscale non valido
      }
    };
  }


  registra(): void {
    if (this.reactiveForm.invalid) {
      console.log('FORM NON VALIDO');
    } else {
      const formData = this.reactiveForm.value;
      // Validazione delle password prima di inviare i dati al server
      if (formData.psw !== formData.confermaPassword) {
        console.log('Le password non corrispondono');
        return;
      }
      console.log('Dati da inviare al server:', formData);

      // Invia i dati del form al servizio FormDataService
      this.formDataService.sendFormData(formData);

      this.api.registrazione(formData).pipe(
        tap(x => console.log(x))
      ).subscribe({
        next: (rit: IRispostaServer) => console.log(rit),
        error: (err: any) => console.log(err),
        complete: () => console.log("completato")
      })


      // Puoi ora gestire il reindirizzamento o altre azioni qui
      this.router.navigateByUrl('/accedi');
    }
  }

}
