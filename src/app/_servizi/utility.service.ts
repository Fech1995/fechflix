import { Injectable } from "@angular/core"
import { sha512 } from "js-sha512"
import jwtDecode from "jwt-decode"

@Injectable({ providedIn: 'root' })

export class UtilityService {
    static somma(a: number, b: number): number {
        console.log("Service calcolo somma", a, b)
        return a + b
    }

    static numeroCasuale(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min
    }
    /**
     * Funzione che crea l'hash sha512 di una stringa
     * @param str stringa da cifrare
     * @returns ritorna stringa cifrata
     */
    static hash(str: string): string {
        const tmp = sha512(str)
        return tmp
    }

    /**
     * Funzione che legge i dati dal token
     * @param token Stringa che 
     * @returns ritorna un oggetto
     */
    static leggiToken(token: string): any {
        try {
            return jwtDecode(token)
        } catch (Error) {
            console.error("Errore di lettura nel token")
            return null
        }
    }

    /**
     * Funzione che calcola l'HASH sha512 della password legata al sale
     * @param password string -rappresenta la password
     * @param sale string -rappresenta il salt da legare alla password
     * @returns string rappresenta l'HASH sha512 della password unita al salt
     */
    static nascondiPassword(password: string, sale: string): string {
        const tmp: string = sale + password
        const hash: string = sha512(tmp)
        return hash
    }
}