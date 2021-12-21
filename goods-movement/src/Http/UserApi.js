import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/token', {login, password});
    localStorage.setItem('token', data.token);
    return decode(jwt_decode(data.token));
}

export const check = async () => {
    const {data} = await $authHost.post('api/user/token-valid' );
    localStorage.setItem('token', data.token);
    return decode(jwt_decode(data.token));
}

export const updateData = async (info) => {
    const {data} = await $authHost.put('api/user/updateData' ,info);
    console.log(jwt_decode(data.token))
    return jwt_decode(data.token);
}

const decode=(data)=>({
    name: data.name,
    role: data.role,
    firstname: data.firstname,
    lastname: data.lastname,
    patronymic: data.patronymic,
    departmentId: data.departmentId,
    isAuth: true
});