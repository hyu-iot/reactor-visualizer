const axios = require('axios');

const getData = async () => {
    try {
        return await axios.get('http://localhost:8080/api');
    } catch (error) {
        console.error(error);
    }
};

const getAllData = async () => {
    try {
        return await axios.get('http://localhost:8080/api/get/all');
    } catch (error) {
        console.error(error)
    }

};

const pushData = async () => {
    try {

        return await axios.post('http://localhost:8080/api/add', {
            id: 3,
            name: 'hello',
        })
    } catch (error) {
        console.log("post error")
        console.error(error);
    }
};

const printData = async ()=> {
    const data = await getAllData()
        .then(response => {
            console.log(response.data[0].dot);
        });
};


printData();

//pushData()
//    .then(response => {console.log(response);});

