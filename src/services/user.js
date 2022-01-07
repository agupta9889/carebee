import Service from "./index";

export default {
    getData(currentPage, limit, type) {
        return Service.get('user/get?page=' +currentPage+ '&limit=' +limit+ '&type='+type);
    },

    moodData(id){
        return Service.get('/user/getbyid/' +id)
    },
};