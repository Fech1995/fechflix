import { Immagine } from "./immagine.type"

export type Categoria = {
    id:number,
    nome:string,
    watch:number,
    img?:Immagine
}