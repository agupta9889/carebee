import Service from "./index"

export default {
    searchData(data){
        return Service.get('/user/search/' +data);
    },
};