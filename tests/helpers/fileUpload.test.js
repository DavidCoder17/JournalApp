import { v2 as cloudinary } from 'cloudinary';
import { fileUpoload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dxckvvs08',
    api_key: '485699372142884',
    api_secret: 'fqhHJyc7WF6OD9LuK6K3SGGvffk',
    secure: true
})

describe('Pruebas en FileUpload', () => {
    
    test('debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Black_Sabbath_%281970%29.jpg/640px-Black_Sabbath_%281970%29.jpg'
        const resp = await fetch( imageUrl )
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpoload( file )
        expect( typeof url ).toBe('string')
        // console.log(url);
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '')

        const cloudRep = await cloudinary.api.delete_resources([ 'journal-app/' + imageId ], {
            resource_type: 'image'
        });
        console.log({cloudRep});
    })

    test('debe de retornal null', async() => {

        const file = new File([], 'foto.jpg')
        const url = await fileUpoload( file )
        expect( url ).toBe( null )

    })

});