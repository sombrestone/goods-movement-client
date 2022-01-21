import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../App";
import {Grid, TextField, Typography} from "@mui/material";
import CrudTable from "../../Components/CrudTable/CrudTable";
import {toast} from "react-toastify";

const Suppliers = (props) => {

    const {store, setStore} = useContext(Context);

    const emptyState = {
        id: null,
        name: "",
        address: "",
        unp: ""
    };

    const [state, setState] = useState(emptyState);

    useEffect(() => {
        props.get().then(data => {
            setStore(s => ({...s, suppliers: data}));
        });
    }, [store.v]);

    const columns = [
        {field: 'num', headerName: '#', width: 90},
        {
            field: 'name',
            headerName: 'Наименование',
            width: 150,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Адрес',
            width: 150,
            editable: true,
        },
        {
            field: 'unp',
            headerName: 'УПН',
            width: 150,
            editable: true,
        }
    ];

    const Form = (props) => {
        const [state] = props.state;

        const [name, setName] = useState({value: state.name});
        const [address, setAddress] = useState({value: state.address});
        const [unp, setUnp] = useState({value: state.unp});

        useEffect(() => {
            props.setTask(() => {
                props.event({
                    id: state.id,
                    name: name.value,
                    address: address.value,
                    unp: unp.value
                });
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
                        onChange={(e) => setName(s => ({...s, value: e.target.value}))}
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
                        onChange={(e) => setAddress(s => ({...s, value: e.target.value}))}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="УПН"
                        id="unp"
                        value={unp.value}
                        onChange={(e) => setUnp(s => ({...s, value: e.target.value}))}
                    />
                </Grid>
            </Grid>
        </Grid>)
    };


    let rows = store.suppliers;

    const storeUpdate = (func, arg) => {
        try {
            func(arg).then(() => (setStore(s => ({...s, v: store.v + 1}))))
                .catch(e => (toast.error("Ошибка")));
            ;
        } catch (e) {
            toast.error("Ошибка");
        }
    }

    return (
        <div>
            <Typography variant="h4" component="div" gutterBottom margin={"1vw"}>
                Справочник поставщиков
            </Typography>
            <CrudTable
                columns={columns}
                rows={rows}
                form={Form}
                state={[state, setState]}
                emptyState={emptyState}
                modalTitle={{
                    add: "Добавление нового поставщика",
                    upd: "Редактирование поставщика"
                }}
                add={(arg) => storeUpdate(props.add, arg)}
                remove={(arg) => storeUpdate(props.delete, arg)}
                update={(arg) => storeUpdate(props.update, arg)}
            />
        </div>
    );
};

export default Suppliers;