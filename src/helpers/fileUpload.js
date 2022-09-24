export const fileUpoload = async( file ) => {
    if( !file) return null

    const cloudURL = 'https://api.cloudinary.com/v1_1/dxckvvs08/upload'

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'react-journal')

    try {
        
        const resp = await fetch( cloudURL, {
            method: 'POST',
            body: formData
        } )

        if( !resp.ok) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json()

        return cloudResp.secure_url

    } catch (error) {
        // throw new Error(error.message)
        return null
    }

};