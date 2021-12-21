import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../App";
import CrudTable from "../../Components/CrudTable/CrudTable";
import {Grid, TextField} from "@mui/material";

const Shops = (props) => {

    const {store,setStore}=useContext(Context);

    const emptyState={
        id: null,
        name: "",
        address:""
    };

    const [state,setState]= useState(emptyState);

    useEffect(()=> {
        props.get().then(data => {
            setStore(s=>({...s,shops: data}));
        });
    },[store.v]);

    const columns = [
        { field: 'num', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Название',
            width: 150,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Адрес',
            width: 150,
            editable: true,
        }
    ];



    const Form =(props)=> {
        const [state]=props.state;

        const [name,setName]= useState({value: state.name});
        const [address,setAddress]= useState({value: state.address});

        useEffect(()=>{
            props.setTask(()=>{
                props.event({
                    id: state.id,
                    name: name.value,
                    address: address.value,
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
                <Grid item>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Адрес"
                        id="address"
                        value={address.value}
                        onChange={(e)=>setAddress(s=>({...s,value:e.target.value}))}
                    />
                </Grid>
            </Grid>
        </Grid>)
    };


    let rows=store.shops;

    const storeUpdate=(func,arg)=>{
        func(arg);
        setStore(s=>({...s,v: store.v+1}));
    }

    return (
        <CrudTable
            columns={columns}
            rows={rows}
            form={Form}
            state={[state,setState]}
            emptyState={emptyState}
            modalTitle={{add:"Добавление нового магазина",
                upd:"Редактирование данных магазина"}}
            add={(arg)=>storeUpdate(props.add,arg)}
            remove={(arg)=>storeUpdate(props.delete,arg)}
            update={(arg)=>storeUpdate(props.update,arg)}
        />
    );
};

export default Shops;