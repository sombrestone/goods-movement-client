import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../App";
import {Grid, TextField, Typography} from "@mui/material";
import CrudTable from "../../Components/CrudTable/CrudTable";
import {toast} from "react-toastify";

const Workers = (props) => {

    const {store,setStore}=useContext(Context);

    useEffect(()=> {
        props.get().then(data => {
            setStore(s=>({...s,workers: data}));
        });
    },[store.v]);

    const emptyState={
        id: null,
        login:"",
        password:"",
        firstname:"",
        lastname:"",
        patronymic:"",
        roleName:"",
        roleId:""
    };

    const [state,setState]=
        useState(emptyState);

    const columns = [
        { field: 'num', headerName: '#', width: 90 },
        {
            field: 'login',
            headerName: 'Логин',
            width: 150,
            editable: true,
        },
        {
            field: 'lastname',
            headerName: 'Фамилия',
            width: 150,
            editable: true,
        },
        {
            field: 'firstname',
            headerName: 'Имя',
            width: 150,
            editable: true,
        },
        {
            field: 'patronymic',
            headerName: 'Отчество',
            width: 150,
            editable: true,
        }
    ];

    let rows=store.workers;

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

        const [number,setNumber]= useState({value: state.number});

        useEffect(()=>{
            props.setTask(()=>{
                props.event({id: state.id,percent: number.value});
            });
        });

        return (<Grid>
            <Grid item>
                <Grid item>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Ставка НДС"
                        id="percent"
                        type="number"
                        value={number.value}
                        onChange={(e)=>setNumber(s=>({...s,value:e.target.value}))}
                    />
                </Grid>
            </Grid>
        </Grid>)
    };

    return (
        <div>
            <Typography variant="h4" component="div" gutterBottom margin={"1vw"}>
                Справочник сотрудников
            </Typography>
            <CrudTable
                columns={columns}
                rows={rows}
                form={Form}
                state={[state,setState]}
                emptyState={emptyState}
                modalTitle={{add:"Добавление нового товара",
                    upd:"Редактирование товара"}}
                add={(arg)=>storeUpdate(props.add,arg)}
                remove={(arg)=>storeUpdate(props.delete,arg)}
                update={(arg)=>storeUpdate(props.update,arg)}
            />
        </div>
    );
};

export default Workers;