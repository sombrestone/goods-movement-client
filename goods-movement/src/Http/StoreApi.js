import {$authHost, $host} from "./index";

export const getSuppliers= async () => {
    const {data} = await $host.get('api/Supplier');
    let result=[];
    data.map(el=>result.push({
        id: el.id,
        name: el.name,
        address: el.address,
        unp: el.unp
    }));
    return result;
}

export const addSupplier= async (supplier) => {
    const {data} = await $host.post('api/Supplier',supplier);
    return data;
}

export const delSupplier=async(id)=>{
    const {data} = await $authHost.delete('api/Supplier/'+id);
    return data;
}

export const putSupplier=async(supplier)=>{
    const {data} = await $authHost.put('api/Supplier', supplier);
    return data;
}

export const getVats= async () => {
    const {data} = await $host.get('api/Vat');
    let result=[];
    data.map(el=>result.push({
        id: el.id,
        percent: el.percent
    }));
    return result;
}

export const addVat= async (vat) => {
    const {data} = await $host.post('api/Vat',vat);
    return data;
}

export const delVat=async(id)=>{
    const {data} = await $authHost.delete('api/Vat/'+id);
    return data;
}

export const putVat=async(vat)=>{
    const {data} = await $authHost.put('api/Vat', vat);
    return data;
}

export const getShops= async () => {
    const {data} = await $host.get('api/Shop');
    let result=[];
    data.map(el=>result.push({
        id: el.id,
        name: el.name,
        address: el.address
    }));
    return result;
}

export const addShop= async (vat) => {
    const {data} = await $host.post('api/Shop',vat);
    return data;
}

export const delShop=async(id)=>{
    const {data} = await $authHost.delete('api/Shop/'+id);
    return data;
}

export const putShop=async(vat)=>{
    const {data} = await $authHost.put('api/Shop', vat);
    return data;
}

export const getSubdivisions= async (id) => {
    const {data} = await $host.get('api/Department/get-by-shop/'+id);
    let result=[];
    if (Array.isArray(data)) {
        data?.map(el => result.push({
            id: el.id,
            name: el.name,
            shopId: el.shopId,
            shopName: el.shopName
        }));
    }
    return result;
}

export const addSubdivision= async (vat) => {
    const {data} = await $host.post('api/Department/',vat);
    return data;
}

export const delSubdivision=async(id)=>{
    const {data} = await $authHost.delete('api/Department/'+id);
    return data;
}

export const putSubdivision=async(vat)=>{
    const {data} = await $authHost.put('api/Department', vat);
    return data;
}