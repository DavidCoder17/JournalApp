
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase";
import { checkingCredentials, login, logOut } from "../../../src/store/auth/authSlice";
import { chekingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogOut } from "../../../src/store/auth/thunks";
import { clearNotesLogOut } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('debe de invocar el checkingCredentials', async () => {

        await chekingAuthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito ', async () => {

        const loginData = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
        

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Error ', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en google' }
        await signInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logOut( loginData ) )
        
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {

        await startLogOut()(dispatch)
        expect( logoutFirebase ).toHaveBeenCalled( )
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogOut() )
        expect( dispatch ).toHaveBeenCalledWith( logOut({}) );

    });

});