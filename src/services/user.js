import Service from "./index";

export default {
    getData(currentPage, limit, type) {
        return Service.get('user/get?page=' +currentPage+ '&limit=' +limit+ '&type='+type);
    },
    moodData(id){
        return Service.get('/user/getbyid/' +id)
    },
    userPersonalData(id){
        return Service.get('/user/getbyid/' +id)
    },
    DoctorShowName(id){
        return Service.get('/user/getbyid/' +id)
    },
    getAllUserwithOutLimt(type){
        return Service.get('user/getUserAll?type=' +type)
    },
    getAllUserWithAgeGroup(type, gender){
        return Service.get('user/getUserAgeWaiseCount?type='+type+ '&gender='+gender)
    },
    getAllUserwithO(type, gender){
        return Service.get('user/getUserPastSevenDay?type='+type+ '&gender='+gender)
    },
    bookingAppointmentCountPerMonth(type, data){
        return Service.post('user/bookingAppointmentCount?type='+type, data )
    },
    memberShipCreate(id, data){
        return Service.post('/user/createMemberShip/' +id, data)
    },
    memberShipUpdate(id, data){
        return Service.put('/user/updateMemberShip/' +id, data)
    }
};