import endpoints from "./endpoints"
import axios from 'axios'
import { Base_URL } from '../configs/Configs'
const uploadFile = async (e) => {
    const uploadData = new FormData();
    uploadData.append(e.type, {
        name: 'image',
        uri: e.uri,
    });
    try {
        const res = await axios.post(`${Base_URL + endpoints.v1.upload()}`,
            {
                body: uploadData
            })
            .then((response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
export {
    uploadFile,
}