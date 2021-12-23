import React, {useEffect, useState} from 'react';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import {Autocomplete, Box, Grid, TextField, Typography} from "@mui/material";
import DataGrid, {Column, MasterDetail} from "devextreme-react/data-grid";

const MovementReport = (props) => {

    const {getShops, getDepartments, getMovement} = props;

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);


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

    const [movement, setMovement] = useState(null);

    useEffect(() => {
        getMovement({
            shopId: selShop?.id,
            depIds: selDepartments?.map(x => x.id)
        }).then(data => {
            setMovement(data);
        });
    }, [selDepartments, selShop]);


    const Product=(props)=>{
        return(
            <React.Fragment>
                <Typography component="div">
                    Товары
                </Typography>
                <DataGrid
                    dataSource={props.data.data.products}
                    showBorders={true}
                    columnAutoWidth={true}
                    keyExpr="productId"
                >
                    <Column dataField="productName" caption={"Наименование"}/>
                    <Column dataField="unitName" caption={"Ед. изм."}/>
                    <MasterDetail
                        enabled={true}
                        component={Consignment}
                    />
                </DataGrid>
            </React.Fragment>
        );
    }

    const Consignment=(props)=>{
        return(
            <React.Fragment>
                <Typography component="div">
                    Партии
                </Typography>
                <DataGrid
                    dataSource={props.data.data.consignments}
                    showBorders={true}
                    columnAutoWidth={true}
                    keyExpr="consignmentId"
                >
                    <Column dataField="docNumber" caption={"Номер документа"}/>
                    <Column dataField="price" caption={"Розн. цена"}/>
                    <Column dataField="endRemainder" caption={"Остаток"}/>
                    <MasterDetail
                        enabled={true}
                        component={Moves}
                    />
                </DataGrid>
            </React.Fragment>
        );
    }

    const Moves=(props)=>{
        return(
            <React.Fragment>
                <Typography component="div">
                    Движение
                </Typography>
                <DataGrid
                    dataSource={props.data.data.moves}
                    showBorders={true}
                    columnAutoWidth={true}
                    keyExpr="docId"
                >
                    <Column dataField="docTypeName" caption={"Тип"}/>
                    <Column dataField="date" caption={"Дата"} dataType="date"/>
                    <Column dataField="docNumber" caption={"Номер документа"}/>
                    <Column dataField="number" caption={"Количество"}/>
                </DataGrid>
            </React.Fragment>
        );
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container>
                <Grid sx={12}>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                            <DatePicker
                                label="Начало периода"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DatePicker
                                label="Конец периода"
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
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
                              dataSource={movement}
                              keyExpr="departmentId"
                              showBorders={true}
                    >
                        <Column dataField="departmentName" width={200} caption="Отдел" />
                        <MasterDetail
                            enabled={true}
                            component={Product}
                        />
                    </DataGrid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MovementReport;