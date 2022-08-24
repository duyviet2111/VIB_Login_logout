import axios from 'axios';

class MenuApi {
    getMenus = async() => {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/Menu');
        return response.data;
    };
}

export const menuApi = new MenuApi();