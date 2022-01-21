import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../App";
import {Grid, TextField, Typography} from "@mui/material";
import CrudTable from "../../Components/CrudTable/CrudTable";
import {toast} from "react-toastify";

const Vat = (props) => {

    const {store,setStore}=useContext(Context);

    const emptyState={
        id: null,
        percent: 0.0
    };

    const [state,setState]= useState(emptyState);

    useEffect(()=> {
        props.get().then(data => {
            setStore(s=>({...s,vats: data}));
        });
    },[store.v]);

    const columns = [
        { field: 'num', headerName: '#', width: 90 },
        {
            field: 'percent',
            headerName: 'Процент НДС',
            width: 150,
            editable: true,
        }
    ];

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

    let rows=store.vats;

    const storeUpdate=(func,arg)=>{

        try {
            func(arg).then(()=>(setStore(s=>({...s,v: store.v+1}))))
                .catch(e => (toast.error("Ошибка")));;
        }
        catch (e) {
            toast.error("Ошибка");
        }
    }


    return (
        <div>
            <Typography variant="h4" component="div" gutterBottom margin={"1vw"}>
                Справочник ставок НДС
            </Typography>
        <CrudTable
            columns={columns}
            rows={rows}
            form={Form}
            state={[state,setState]}
            emptyState={emptyState}
            modalTitle={{add:"Добавление нового значения НДС",
                upd:"Редактирование значения НДС"}}
            add={(arg)=>storeUpdate(props.add,arg)}
            remove={(arg)=>storeUpdate(props.delete,arg)}
            update={(arg)=>storeUpdate(props.update,arg)}
        />
        </div>
    );
};

export default Vat;