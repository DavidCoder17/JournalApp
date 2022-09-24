import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase";
import { clearNotesLogOut } from "../journal/journalSlice";
import { checkingCredentials, authSlice, logOut, login } from "./";

export const chekingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() )

    }
};

export const startGoogleSignIn = (  ) => {
    return async (dispatch) => {

        dispatch( checkingCredentials() )
        const result = await signInWithGoogle()

        if ( !result.ok ) return dispatch( logOut( result ) )

        dispatch( login( result ) )

    }
};

export const startCreatingUserWithEmailPawssword = ( { email, password, displayName } ) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName})
        if( !ok ) return dispatch( logOut({errorMessage}) )

        dispatch( login( { uid, displayName, email, photoURL } ) )    

    }

};

export const startLoginWithEmailPassword = ( { email, password } ) => {
    return async (dispatch ) => {

        dispatch( checkingCredentials() )
        const result = await loginWithEmailPassword({email, password})
        if( !result.ok ) return dispatch( logOut({errorMessage: result.errorMessage}) )

        dispatch( login( result ) )

    }
};

export const startLogOut = (  ) => {
    return async(dispatch) => {

        await logoutFirebase()
        dispatch( clearNotesLogOut() )
        dispatch( logOut({}) )

    }
};