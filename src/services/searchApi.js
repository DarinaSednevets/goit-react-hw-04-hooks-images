import axios from 'axios';

const key = '23512554-e547646786d485755b782e033';


const searchApi = ({ query = '', page = 1 }) => {
    console.log(query);
    return axios
        .get(
            `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => data.hits);
}
export default searchApi;

