const signatures = {
    'JVBERi0': 'application/pdf',
    'R0lGODdh': 'image/gif',
    'R0lGODlh': 'image/gif',
    'iVBORw0KGgo': 'image/png',
    '/9j/': 'image/jpeg',
};


export default function getMimeType(imageBase64String) {

    if(imageBase64String.startsWith('data:image')){
        const base64StringArr = imageBase64String.split(';base64,');
        const imageTypeArr = base64StringArr[0].split(':');
        return imageTypeArr[1]        
    } else {

        for(const sign in signatures)if(imageBase64String.startsWith(sign))return signatures[sign];
    }
};
