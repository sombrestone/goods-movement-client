import {$authHost, $host} from "./index";

export const getUnits = async () => {
    const {data} = await $host.get('api/Unit');
    let result=[];
    data.map(el=>result.push({
        id: el.id,
        name: el.name,
        shortName: el.shortName
    }));
    return result;
}

export const addUnit = async (unit) => {
    const {data} = await $host.post('api/unit',unit);
    return data;
}

export const delUnit=async(id)=>{
    const {data} = await $authHost.delete('api/unit/'+id);
    return data;
}

export const putUnit=async(unit)=>{
    const {data} = await $authHost.put('api/unit', unit);
    return data;
}

export const getProducts = async () => {
    const {data} = await $host.get('api/Product');
    let result=[];
    data.map(el=>result.push({
        id: el.id,
        name: el.name,
        unitName: el.unitName,
        unitShortName: el.unitShortName,
        unitId: el.unitId,
    }));
    return result;
}

export const addProduct = async (unit) => {
    const {data} = await $host.post('api/Product',unit);
    return data;
}

export const delProduct=async(id)=>{
    const {data} = await $authHost.delete('api/Product/'+id);
    return data;
}

export const putProduct=async(unit)=>{
    const {data} = await $authHost.put('api/Product', unit);
    return data;
}