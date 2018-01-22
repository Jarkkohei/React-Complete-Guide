import axios from 'axios';

const instance = axios.create({
    baseURL: '<YourFirebaseProjectAddressHere>'
});

export default instance;