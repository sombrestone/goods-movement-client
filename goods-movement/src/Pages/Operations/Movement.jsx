import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField} from "@mui/material";



const Movement = (props) => {
    const {getShops,getDepartments,getSmartBalance,saveMove}=props;

    const [shops,setShops]=useState([]);
    const [selShop,setSelShop]=useState(null);
    const [selToShop,setSelToShop]=useState(null);

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

    const [toDepartments,setToDepartments]=useState([]);
    const [selToDepartment,setSelToDepartment]=useState(null);

    useEffect(()=> {
        getDepartments(selToShop?.id).then(data => {
            setToDepartments(data.map(x=>({...x,label: x.name})));
        });
    },[selToShop?.id]);

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

                <Grid item>
                    <Autocomplete
                        onChange={
                            (event, newValue) => {
                                setSelToShop(newValue);
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
                                setSelToDepartment(newValue);
                            }
                        }
                        id="controllable-states-demo"
                        options={toDepartments}
                        sx={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField  fullWidth
                                        margin="dense"
                                        variant="outlined" {...params}
                                        label="Отделение" />}
                    />
                </Grid>

                <Grid item>
                    <Button
                        onClick={()=>{
                            saveMove(
                                {
                                    consignmentId: selProduct.consignmentId,
                                    number: number,
                                    fromDepId: selDepartment.id,
                                    toDepId: selToDepartment.id
                                }
                            )
                        }}
                    >
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Movement;