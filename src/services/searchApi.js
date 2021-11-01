import axios from 'axios';

const KEY = '23512554-e547646786d485755b782e033';
axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (query, page) => {
    const { data } = await axios.get(
        `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    );

    return data;
};

export default fetchImages;
