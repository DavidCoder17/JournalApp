import { authSlice, checkingCredentials, login, logOut } from "../../../src/store/auth/authSlice";
import { demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {

    test('debe de regresar el estado iniical y llamarse "auth"', () => {

        const state = authSlice.reducer(initialState, {})

        expect(authSlice.name).toBe('auth')
        expect(state).toEqual(initialState)

    });

    test('debe de realizar la autenticacion', () => {

        const state = authSlice.reducer(initialState, login(demoUser))

        expect(state).toEqual({
            status: 'authenticated', //'checking' 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })

    });

    test('debe de realizar el logout sin argumentos', () => {

        const stateLogOut = authSlice.reducer(initialState, logOut(demoUser))
        
        expect( stateLogOut ).toEqual( notAuthenticatedState )

    })

    test('debe de realizar el logout y mostrar el mensaje de error', () => {

        const errorMessage = 'Credenciales no son correctas'
        const stateLogOut = authSlice.reducer(initialState, logOut({errorMessage}))
        notAuthenticatedState.errorMessage = errorMessage

        expect( stateLogOut ).toEqual( notAuthenticatedState )
    })

    test('debe de cambiar el estado a checking', () => {
        const state = authSlice.reducer(initialState, checkingCredentials())
        
        expect( state.status ).toBe( 'checking' )
    });

});