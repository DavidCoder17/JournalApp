import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Es una instancia
const googleProvider = new GoogleAuthProvider()

// * Iniciar sesion con google
export const signInWithGoogle = async () => {
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider) // * Nos crea el inicio de sesion con la ventana de google
        // const credentials = GoogleAuthProvider.credentialFromResult( result ) // * nos regresa el resultado de la autenticacionm
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            // User Info
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
            errorCode
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user
        await updateProfile(FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            // User Info
            displayName,
            email,
            photoURL,
            uid
        }


    } catch (error) {
        // console.log(error);

        return { ok: false, errorMessage: error.message }

    }

};

export const loginWithEmailPassword = async ({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { displayName, photoURL, uid } = resp.user

        return {
            ok: true,
            displayName, photoURL, uid
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message, errorCode: error.code }
    }

};

export const logoutFirebase = async(  ) => {
    return await FirebaseAuth.signOut()
};
