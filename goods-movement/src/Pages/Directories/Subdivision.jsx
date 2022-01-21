import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../App";
import {Autocomplete, Grid, TextField, Typography} from "@mui/material";
import CrudTable from "../../Components/CrudTable/CrudTable";
import {toast} from "react-toastify";

const Subdivision = (props) => {

    const {store,setStore}=useContext(Context);

    const emptyState={
        id: null,
        name: "",
        shopId:null,
        shopName: ""
    };

    const [state,setState]= useState(emptyState);

    const [shops,setShops]=useState();
    const [dep,setDep]=useState();

    useEffect(()=> {
        props.getShops().then(shop => {
            setShops(shop);
        });
    },[store.v]);


    const columns = [
        { field: 'num', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Название',
            width: 150,
            editable: true,
        }
    ];



    let options=shops?.map(x=>({
        label: x.address,
        id: x.id
    }));


    const [selectedShop,setSelectedShop]=useState('');

    const storeUpdate=(func,arg)=>{

        try {
            func(arg).then(()=>(setStore(s=>({...s,v: store.v+1}))))
                .catch(e => (toast.error("Ошибка")));;
        }
        catch (e) {
            toast.error("Ошибка");
        }
    }

    const Form =(props)=> {
        const [state]=props.state;

        const [name,setName]= useState({value: state.name});

        useEffect(()=>{
            props.setTask(()=>{
                props.event({
                    id: state.id,
                    shopId: props.vars.shop.id,
                    name: name.value
                });});});

        return (<Grid>
            <Grid item>
                <Grid item>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Имя"
                        id="name"
                        value={name.value}
                        onChange={(e)=>setName(s=>({...s,value:e.target.value}))}
                    />
                </Grid>
            </Grid>
        </Grid>)
    };

    const [rows, setRows]=useState([]);


    useEffect(()=> {
        props.get(selectedShop.id).then(data => {
            setRows(data);
        });
    },[selectedShop,store.v]);


    return (
        <div>
            <Typography variant="h4" component="div" gutterBottom margin={"1vw"}>
                Справочник отделов
            </Typography>
            <Autocomplete
                value={selectedShop===undefined || selectedShop===null ?"":selectedShop.label}
                onChange={(event, newValue) => {
                    if (newValue?.id!=undefined) {
                    setSelectedShop(newValue);
                    }
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) =>
                    <TextField  fullWidth
                                margin="dense"
                                variant="outlined" {...params}
                                label="Магазин" />}
            />
            <CrudTable
                columns={columns}
                rows={rows}
                form={Form}
                state={[state,setState]}
                emptyState={emptyState}
                modalTitle={{add:"Добавление нового отдела",
                    upd:"Редактирование отдела"}}
                add={(arg)=>storeUpdate(props.add,arg)}
                remove={(arg)=>storeUpdate(props.delete,arg)}
                update={(arg)=>storeUpdate(props.update,arg)}
                vars={{shop: selectedShop,dep: dep}}
            />
        </div>
    );
};

export default Subdivision;