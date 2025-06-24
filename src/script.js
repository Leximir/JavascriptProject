import axios from 'axios';

const response = await axios.get('https://dummyjson.com/products');
console.log(response);