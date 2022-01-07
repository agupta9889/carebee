import Service from "./index";

export default {
    insert(data) {
        return Service.post('/user/create', data);
    },

    get(currentPage, limit, type) {
        return Service.get('user/get?page=' +currentPage+ '&limit=' +limit+ '&type='+type);
    },
    
    update(id, data) {
        return Service.put('/user/updatebyid/' +id, data);
    },

    profile(id) {
        return Service.get('/user/getbyid/' +id);
    },

};