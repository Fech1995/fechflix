import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function ControlloStringa(control:AbstractControl):ValidationErrors|null{
//     const valore = control.value
//     if(valore === "ciao"){
//         return {ControlloStringa:"Hai inserito ciao e non puoi"}
//     } else {
//         return null
//     }
// }

export const ControlloStringa = (parametro: string): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    const valore = control.value
    if (valore === parametro) {
        return { ControlloStringa: "Hai inserito " + parametro + " e non puoi" }
    } else {
        return null
    }
}

export const CustomProva = (campo: string): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    const valore = control.value
    // const { value } = control //è la stessa cosa della riga sopra

    console.log(valore)

    if (control.parent !== null) {
        const field = control.parent.get(campo)
        if (field !== null && field.value == 1 && valore === "ciao") {
            return { CustomProva: "I campi hanno valori che non possono avere" }
        } else {
            return null
        }
    } else {
        return null
    }
}

export const CustomProva2 = (campo1: string, campo2: string): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    if (control.parent !== null && control.parent.get(campo1) !== null && control.parent.get(campo2) !== null) {
        const field1 = control.parent.get(campo1)
        const field2 = control.parent.get(campo2)
        if (field1 !== null && field2 !== null) {
            console.log(field1.value + "-"+field2.value)
            if (field1.value == 1 && field2.value === "ciao") {
                return { CustomProva2: "I campi hanno valori che non possono avere" }
            } else {
                field1.setErrors(null)
                field2.setErrors(null)
                return null
            }
        } else {
            console.log("Field = null")
            return null
        }
    } else {
        console.log("control.parent = null")
        return null
    }
}

export const CustomProva3 = (campo1: string, campo2: string): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
        const field1 = control.get(campo1)
        const field2 = control.get(campo2)
        if (field1 !== null && field2 !== null) {
            console.log(field1.value + "-"+field2.value)
            if (field1.value == 1 && field2.value === "ciao") {
                field1.setErrors({CampoRisorsa:"valore non accettato"})
                field2.setErrors({CampoNome:"valore non accettato"})
                return { CustomProva2: "I campi hanno valori che non possono avere" }
            } else {
                field1.setErrors(null)
                field2.setErrors(null)
                return null
            }
        } else {
            console.log("Field = null")
            return null
        }
}