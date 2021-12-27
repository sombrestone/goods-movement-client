import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField} from "@mui/material";

const Sales = (props) => {

    const {getShops,getDepartments,getSmartBalance,saveSale}=props;

    const [shops,setShops]=useState([]);
    const [selShop,setSelShop]=useState(null);

    useEffect(()=> {
        getShops().then(data => {
            setShops(data.map(x=>({...x,label: x.address})));
        });
    },[]);

    const [departments,setDepartments]=useState([]);
    const [selDepartment,setSelDepartment]=useState(null);

    useEffect(()=> {
        getDepartments(selShop?.id).then(data => {
            setDepartments(data.map(x=>({...x,label: x.name})));
        });
    },[selShop?.id]);

    const [products,setProducts]=useState([]);
    const [selProduct,setSelProduct]=useState(null);

    useEffect(()=> {
        getSmartBalance(selDepartment?.id).then(data => {
            setProducts(data.map(x=>({
                ...x,
                label: x.productName +' - '
                    + x.number.toString() +' - '
                    + x.price.toFixed(2).toString()})));
        });
    },[selDepartment?.id]);

    const [number,setNumber]=useState(0);


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item>
                    <Autocomplete
                        onChange={
                            (event, newValue) => {
                                setSelShop(newValue);
                            }
                        }
                        id="controllable-states-demo"
                        options={shops}
                        sx={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField  fullWidth
                                        margin="dense"
                                        variant="outlined" {...params}
                                        label="Магазин" />}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        onChange={
                            (event, newValue) => {
                                setSelDepartment(newValue);
                            }
                        }
                        id="controllable-states-demo"
                        options={departments}
                        sx={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField  fullWidth
                                        margin="dense"
                                        variant="outlined" {...params}
                                        label="Отделение" />}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        groupBy={(option) => option.productName}
                        onChange={
                            (event, newValue) => {
                                setSelProduct(newValue);
                            }
                        }
                        id="controllable-states-demo"
                        options={products}
                        sx={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField  fullWidth
                                        margin="dense"
                                        variant="outlined" {...params}
                                        label="Товар" />}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        sx={{ width: 300 }}
                        margin="dense"
                        variant="outlined"
                        label="Количество"
                        id="percent"
                        type="number"
                        value={number}
                        onChange={(e)=>(setNumber(parseInt(e.target.value)))}
                    />
                </Grid>
            </Grid>
            <Button
                onClick={()=>{
                    props.saveSale(
                        {
                            consignmentId: selProduct.consignmentId,
                            number: number,
                            departmentId: selDepartment.id
                        }
                    )
                }}
            >
                Сохранить
            </Button>
        </Box>
    );
};

export default Sales;