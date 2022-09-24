import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase";
import { fileUpoload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = ( ) => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // * Asi se graba
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) ) // Firebase DB cointiene todo lo necesario para conectarse a la db
        const req = await setDoc( newDoc, newNote )

        // Crea el id en la nota
        newNote.id = newDoc.id

        //! dipsatch
        dispatch ( addNewEmptyNote( newNote ) )
        dispatch ( setActiveNote( newNote ) )

    }
};

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth
        if( !uid ) throw new Error('El UID del usuario no existe')

        const newNotes = await loadNotes(uid)
        dispatch( setNotes(newNotes) )
    }   
};

export const startSaveNote = ( ) => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
    
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true });
        dispatch( updateNote( note ) )

    }
};

export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch )=>{

        dispatch( setSaving() );

        // await fileUpoload(files[0])
        // * Almacena las peticiones en el arreglo para dispararlas de froma simultanea
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push( fileUpoload( file ) )
        }

        // ? Promise.all() toma un arreglo de promsesas y las resuelve simultaneamente, retorna la respuesta
        const photosUrls = await Promise.all( fileUploadPromises )

        dispatch( setPhotosToActiveNote( photosUrls ) )

    }
};

export const startDeletingNote = ( ) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` )
        await deleteDoc( docRef )

        dispatch( deleteNoteById( note.id ) )

    }
};