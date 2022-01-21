import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../App";
import {Autocomplete, createFilterOptions, Grid, TextField, Typography} from "@mui/material";
import CrudTable from "../../Components/CrudTable/CrudTable";
import {toast} from "react-toastify";

const Products = (props) => {

    const {products,setProducts}=useContext(Context);

    useEffect(()=> {
        props.getUnit().then(unit => {
            props.get().then(data => {
                setProducts(s=>({unit: unit,products: data}));
            });
        });

    },[products.v]);

    const emptyState={
            id: null,
            name: "",
            unitName: "",
            unitShortName: "",
            unitId: ""
    };

    const [state,setState]=
        useState(emptyState);

    let vars={unit:products.unit};


    const columns = [
        { field: 'num', headerName: '#', width: 90 },
        {
            field: 'name',
            headerName: 'Наименование',
            width: 150,
            editable: true,
        },
        {
            field: 'unitName',
            headerName: 'Единица измерения',
            width: 150,
            editable: true,
        }
    ];


    const Form =(props)=> {

        const [state]=props.state;


        const [name,setName]= useState({value: state.name});

        const options=props.vars.unit.map(x=>({
            label: x.name,
            id: x.id,
            shortName: x.shortName
        }));

        const [unit,setUnit]=
            useState( options.find((x)=>(x.id==state.unitId)));


        useEffect(()=>{
            props.setTask(()=>{
                props.event({id: state.id,name: name.value, unitId: unit.id});
            });
        });

        return (<Grid>
            <Grid item>
                <Grid item>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Наименование"
                        id="name"
                        value={name.value}
                        onChange={(e)=>setName(s=>({...s,value:e.target.value}))}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        value={unit===undefined?"":unit.label}
                        onChange={(event, newValue) => {
                            setUnit(newValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) =>
                            <TextField  fullWidth
                                        margin="dense"
                                        variant="outlined" {...params}
                                        label="Ед. изм." />}
                    />
                </Grid>
            </Grid>
        </Grid>)
    };

    let rows=products.products;

    const storeUpdate=(func,arg)=>{
        try {
            func(arg)
                .then(() => (setProducts(s => ({...s, v: products.v + 1}))))
                .catch(e => (toast.error("Ошибка")));;
        }
        catch (e) {
            toast.error("Ошибка");
        }
    }

    return (
        <div>
            <Typography variant="h4" component="div" gutterBottom margin={"1vw"}>
                Справочник номенклатуры
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
            vars={vars}
        />
        </div>
    );
};

export default Products;