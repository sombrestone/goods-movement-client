import {$authHost, $host} from "./index";
import { DataGrid } from '@mui/x-data-grid';

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