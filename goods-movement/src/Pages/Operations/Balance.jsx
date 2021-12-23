import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Grid, TextField} from "@mui/material";
import DataGrid, {Column, MasterDetail} from 'devextreme-react/data-grid';

const Balance = (props) => {

    const {getShops, getDepartments, getBalance} = props;

    const [shops, setShops] = useState([]);
    const [selShop, setSelShop] = useState(null);

    useEffect(() => {
        getShops().then(data => {
            setShops(data.map(x => ({...x, label: x.address})));
        });
    }, []);

    const [departments, setDepartments] = useState([]);
    const [selDepartments, setSelDepartments] = useState([]);

    useEffect(() => {
        getDepartments(selShop?.id).then(data => {
            setDepartments(data.map(x => ({...x, label: x.name})));
        });
    }, [selShop?.id]);

    const [balance, setBalance] = useState(null);

    useEffect(() => {
        getBalance({
            shopId: selShop?.id,
            depIds: selDepartments?.map(x => x.id)
        }).then(data => {
            setBalance(data);
        });
    }, [selDepartments, selShop]);

    const DetailTemplate=(props)=>{

        return(
            <React.Fragment>
                <DataGrid
                    dataSource={props.data.data.products}
                    showBorders={true}
                    columnAutoWidth={true}
                >
                    <Column dataField="productName" caption={"Наименование"}/>
                    <Column dataField="supplierName" caption={"Поставщик"}/>
                    <Column dataField="price" caption={"Цена розн."} dataType={"money"}/>
                    <Column dataField="number" caption={"Остаток"}/>
                </DataGrid>
            </React.Fragment>
        );
    }

    console.log(balance)

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container >
                <Grid sx={12}>

                    <Grid item>
                        <Autocomplete
                            onChange={
                                (event, newValue) => {
                                    setSelShop(newValue);
                                }
                            }
                            id="controllable-states-demo"
                            options={shops}
                            sx={{width: 300}}
                            renderInput={(params) =>
                                <TextField fullWidth margin="dense"
                                           variant="outlined" {...params}
                                           label="Магазин"/>}
                        />
                    </Grid>

                    <Grid item>
                        <Autocomplete
                            multiple
                            onChange={
                                (event, newValue) => {
                                    setSelDepartments(newValue);
                                }
                            }
                            id="controllable-states-demo"
                            options={departments}
                            sx={{width: 300}}
                            renderInput={(params) =>
                                <TextField fullWidth
                                           margin="dense"
                                           variant="outlined" {...params}
                                           label="Отделение"/>}
                        />
                    </Grid>
                </Grid>
                <Grid sx={12}>
                    <DataGrid id="grid-container"
                              dataSource={balance}
                              keyExpr="departmentId"
                              showBorders={true}
                    >
                        <Column dataField="departmentName" width={200} caption="Отдел" />
                        <MasterDetail
                            enabled={true}
                            component={DetailTemplate}
                        />
                    </DataGrid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Balance;