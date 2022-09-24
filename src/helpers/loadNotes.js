import { collection, doc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase";

export const loadNotes = async( uid = '' ) => {

    if( !uid ) throw new Error('El UID del usuario no existe')
    // crea la referencia a la collecion donde se encuentran los atos de ususario
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` ); 
    // toma la referencia a la collecion y nos retorna los registros
    const docs = await getDocs(collectionRef)
    
    const notes = []
    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() })
    } )

    return notes

};