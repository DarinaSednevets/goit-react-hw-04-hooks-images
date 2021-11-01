import axios from 'axios';

// const key = '23512554-e547646786d485755b782e033';


// const searchApi = ({ query = '', page = 1 }) => {
//     console.log(query);
//     return axios
//         .get(
//             `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
//         )
//         .then(({ data }) => data.hits);
// }
// export default searchApi;



const KEY = '23512554-e547646786d485755b782e033';
axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (query, page) => {
    const { data } = await axios.get(
        `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    );

    return data;
};

export default fetchImages;
// const API_KEY = '21255854-31bcf5c415a33cbe729d04b4b';
// axios.defaults.baseURL = 'https://pixabay.com/api';

// const fetchImages = async (query, currentPage) => {
//     const { data } = await axios.get(
//         `/?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
//     );

//     return data;
// };

// export default fetchImages;