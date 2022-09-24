
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { login, logOut } from "../store/auth"
import { startLoadingNotes } from "../store/journal/thunks"

export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {

        // * Reavisa si hay un usuario guardado
        onAuthStateChanged(FirebaseAuth, async (user) => {
            // * El proceso es sincrono ya que los datos estan guardados
            if (!user) return dispatch(logOut())
            const { uid, email, displayName, photoURL } = user
            dispatch(login({ uid, email, displayName, photoURL }))
            dispatch(startLoadingNotes())

        })

    }, [])

    return status

}
