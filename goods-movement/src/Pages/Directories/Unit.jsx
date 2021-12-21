import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../App";
import CrudTable from "../../Components/CrudTable/CrudTable";
import {Grid, TextField} from "@mui/material";


const Unit = (props) => {

    const {products,setProducts}=useContext(Context);

    const emptyState={
        id: null,
        name: "",
        shortName:"",
    };

    const [state,setState]=
        useState(emptyState);

    useEffect(()=> {
        props.get().then(data => {
            setProducts(s=>({...s,unit: data}));
        });
    },[products.v]);

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

    const Form =(props)=> {
        const [state]=props.state;

        const [name,setName]= useState({value: state.name});
        const [shortName,setShortName]= useState({value: state.shortName});

        useEffect(()=>{
            props.setTask(()=>{
                props.event({id: state.id,name: name.value, shortName: shortName.value});
            });
        });

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
                        label="Сокр. имя"
                        id="shortName"
                        value={shortName.value}
                        onChange={(e)=>setShortName(s=>({...s,value:e.target.value}))}
                    />
                </Grid>
            </Grid>
        </Grid>)
    };

    let rows=products.unit;

    const storeUpdate=(func,arg)=>{
        func(arg);
        setProducts(s=>({...s,v: products.v+1}));
    }

    return (
        <CrudTable
            columns={columns}
            rows={rows}
            form={Form}
            state={[state,setState]}
            emptyState={emptyState}
            modalTitle={{add:"Добавление новой ед. изм.",
                upd:"Редактирование ед. изм."}}
            add={(arg)=>storeUpdate(props.add,arg)}
            remove={(arg)=>storeUpdate(props.delete,arg)}
            update={(arg)=>storeUpdate(props.update,arg)}
        />
    );
};

export default Unit;