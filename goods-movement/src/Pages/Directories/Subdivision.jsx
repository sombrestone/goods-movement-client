import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Subdivision = () => {

    const columns = [
        { field: 'num', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Наименование',
            width: 150,
            editable: true,
        },
        {
            field: 'unp',
            headerName: 'УНП',
            width: 150,
            editable: true,
        }
    ];

    const rows = [
        {id:"sfwefewfw", name: "Журваский логистикс", unp:"123456789"},
        {id:"s423423", name: "Журваский логистикс", unp:"123456789"},
        {id:"ttyuhggh", name: "Журваский логистикс", unp:"123456789"},
        {id:"sbfdbdfbd", name: "Журваский логистикс", unp:"123456789"},
        {id:"5lglrelpp", name: "Журваский логистикс", unp:"123456789"},
    ];

    rows.forEach((value,index)=>{
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

export default Subdivision;