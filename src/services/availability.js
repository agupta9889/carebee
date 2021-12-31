import Service from "./index";

export default {
    get (currentPage, limit, type) {
        return Service.get('/user/get?page=' +currentPage+ '&limit='+limit+ '&type='+type);
    },

    update (doctorID, data) {
        return Service.put('user/updateavailability/' +doctorID, data);
    },

 };