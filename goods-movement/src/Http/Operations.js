import {$authHost, $host} from "./index";

export const saveArrival = async (arrival) => {
    const {data} = await $host.post('api/operations/arrival',arrival);
    return data;
}

export const saveSale = async (sale) => {
    const {data} = await $host.post('api/operations/sale',sale);
    return data;
}

export const saveReturn = async (sale) => {
    const {data} = await $host.post('api/operations/return',sale);
    return data;
}

export const saveMove = async (sale) => {
    const {data} = await $host.post('api/operations/move',sale);
    return data;
}

export const getSmartBalance = async (id) => {
    const {data} = await $host.get('/api/Operations/smart-balance/'+id);
    return data;
}

export const getBalance = async (arrival) => {
    const {data} = await $host.post('api/operations/balance',arrival);
    return data;
}

export const getMovement = async (arrival) => {
    const {data} = await $host.post('api/operations/movement',arrival);
    return data;
}