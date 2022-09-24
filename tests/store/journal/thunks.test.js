import { startNewNote } from "../../../src/store/journal/thunks";

jest.mock('../../../src/firebase/providers')

describe('Pruebas en Journal Thunks', () => {
    
    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach(()=> jest.clearAllMocks())

    test('startNewNote debeb crear una nueva nota en blanco', async () => {
        
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } })

        await startNewNote()( dispatch, getState )

    });

});