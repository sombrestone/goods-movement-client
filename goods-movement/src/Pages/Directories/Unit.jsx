import React, {useContext, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Context} from "../../App";
import {getUnits} from "../../Http/ProductApi";


const Unit = () => {
    const {products,setProducts}=useContext(Context);
    /*
    useEffect(()=>{
        getUnits().then(data=>{
            let newState={...products};
            newState.units=data;
            setProducts(newState);

        });

    });
*/
    const columns = [
        { field: 'num', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Наименование',
            width: 150,
            editable: true,
        },
        {
            field: 'shortName',
            headerName: 'Сокращение',
            width: 150,
            editable: true,
        }
    ];

    let rows=products.units;

    rows?.forEach((value,index)=>{
        value["num"]=index+1;
    });

    return (
        <div style={{ height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
};

export default Unit;