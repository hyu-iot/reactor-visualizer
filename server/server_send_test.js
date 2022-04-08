const axios = require('axios');

const testAdd = async () => {
    try{
        axios.post('http://localhost:8080/api/add', {
            name: 'hi'
        })

    } catch(e){
        console.log(e);
    }

}
testAdd();