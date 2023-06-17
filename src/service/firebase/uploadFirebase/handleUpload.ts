import {
    FirebaseStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import generateUUID from '../../../utils/generateUUID';

const handleUploadFireBase = async (
    file: File | undefined,
    storage: FirebaseStorage
) => {
    if (file) {
        const splitFileName = file.name.split('.');

        const finalModifyName = splitFileName[0]
            .concat(generateUUID())
            .concat('.')
            .concat(splitFileName[1]);

        const storageRef = ref(
            storage,
            `providerQuotationFile/${finalModifyName}`
        );
        const filePath = await uploadBytes(storageRef, file)
            .then((res: any) => {
                console.log(res);
                console.log(res.data);
                return res?.metadata?.fullPath;
            })
            .catch((error) => console.error(error));
        const downloadURL = await getDownloadURL(storageRef);
       

        return downloadURL;
    }
    return '';
};

export default handleUploadFireBase;
