import axios from 'axios';

// export default async function getPicture (inputValue, page) {
//     const keyAPI = '32151990-9b10be0026312dee6c1690c83'
//     const url = 'https://pixabay.com/api/'
//     const options = `?key=${keyAPI}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${page = 1}`

//     return await axios.get(`${url}${options}`).then(response => {
//        return page + 1
//        return response.data})
// }
// `?key=${keyAPI}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`

export default class Picture {
    constructor () {
        this.serchPict = ''
        this.page = 1
    }

    async getPicture () {
        const keyAPI = '32151990-9b10be0026312dee6c1690c83'
        const url = 'https://pixabay.com/api/'
        const options = `?key=${keyAPI}&q=${this.serchPict}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${this.page}`
    
        return await axios.get(`${url}${options}`).then(response => {
           this.plusPict()
           return response.data})
    }

    plusPict () {
        this.page += 1
    }

    resetPage () {
        this.page = 1
    }

    get inputValue () {
        return this.serchPict
    }

    set inputValue(newValueInp) {
        this.serchPict = newValueInp
    }
}