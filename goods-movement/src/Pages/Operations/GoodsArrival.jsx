import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Autocomplete, Button, TextField, Typography} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";


const GoodsArrival = (props) => {

    const {getShops, getDepartments, getProducts, getSuppliers, getVats} = props;

    const [shops, setShops] = useState([]);
    const [selShop, setSelShop] = useState(null);

    useEffect(() => {
        getShops().then(data => {
            setShops(data.map(x => ({...x, label: x.address})));
        });
    }, []);

    const [departments, setDepartments] = useState([]);
    const [selDepartment, setSelDepartment] = useState(null);

    useEffect(() => {
        getDepartments(selShop?.id).then(data => {
            setDepartments(data.map(x => ({...x, label: x.name})));
        });
    }, [selShop?.id]);

    const [products, setProducts] = useState([]);
    const [selProduct, setSelProduct] = useState(null);

    useEffect(() => {
        getProducts().then(data => {
            setProducts(data.map(x => ({...x, label: x.name})));
        });
    }, []);

    const [suppliers, setSuppliers] = useState([]);
    const [selSupplier, setSelSupplier] = useState(null);

    useEffect(() => {
        getSuppliers().then(data => {
            setSuppliers(data.map(x => ({...x, label: x.name})));
        });
    }, []);

    const [vats, setVats] = useState([]);
    const [selVat, setSelVat] = useState(null);


    useEffect(() => {
        getVats().then(data => {
            setVats(data.map(x => ({...x, label: x.percent})));
        });
    }, []);

    const [supplierPrice, setSupplierPrice] = useState(0.0);


    const supplierVat = (selVat != null) ? (selVat.percent / 100) * supplierPrice : 0.0;

    const supplierSum = supplierVat + parseFloat(supplierPrice);

    const [number, setNumber] = useState(0);

    const [markup, setMarkup] = useState(0.0);
    const [markupPercent, setMarkupPercent] = useState(0.0);

    const vatSum = (selVat != null) ? supplierVat + (selVat.percent / 100) * markup : 0.0;
    const priceSum = vatSum + supplierPrice + markup;

    const result = number * priceSum;

    const format = (s) => (+parseFloat(s).toFixed(2));

    return (
        <Box sx={{flexGrow: 1}}>
            <Typography variant="h4" component="div" gutterBottom margin={"1vw"}>
                Поступление товара
            </Typography>
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
                        sx={{width: 300}}
                        renderInput={(params) =>
                            <TextField fullWidth
                                       margin="dense"
                                       variant="outlined" {...params}
                                       label="Магазин"/>}
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
                        sx={{width: 300}}
                        renderInput={(params) =>
                            <TextField fullWidth
                                       margin="dense"
                                       variant="outlined" {...params}
                                       label="Отделение"/>}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        onChange={
                            (event, newValue) => {
                                setSelProduct(newValue);
                            }
                        }
                        id="controllable-states-demo"
                        options={products}
                        sx={{width: 300}}
                        renderInput={(params) =>
                            <TextField fullWidth
                                       margin="dense"
                                       variant="outlined" {...params}
                                       label="Товар"/>}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        onChange={
                            (event, newValue) => {
                                setSelSupplier(newValue);
                            }
                        }
                        id="controllable-states-demo"
                        options={suppliers}
                        sx={{width: 300}}
                        renderInput={(params) =>
                            <TextField fullWidth
                                       margin="dense"
                                       variant="outlined" {...params}
                                       label="Поставщик"/>}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="Цена поставщика"
                        id="percent"
                        type="number"
                        value={supplierPrice.toFixed(2)}
                        onChange={(e) => (setSupplierPrice(format(e.target.value)))}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        onChange={
                            (event, newValue) => {
                                setSelVat(newValue);
                            }
                        }
                        id="controllable-states-demo"
                        options={vats}
                        sx={{width: 300}}
                        renderInput={(params) =>
                            <TextField fullWidth
                                       margin="dense"
                                       variant="outlined" {...params}
                                       label="Ставка НДС"/>}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        disabled
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="НДС поставщика"
                        id="percent"
                        type="number"
                        value={supplierVat.toFixed(2)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        disabled
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="Цена поставщика с НДС"
                        id="percent"
                        type="number"
                        value={supplierSum.toFixed(2)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="Процент Наценки"
                        id="percent"
                        type="number"
                        value={markupPercent.toFixed(2)}
                        onChange={
                            (e) => {
                                setMarkupPercent(format(e.target.value));
                                setMarkup(format((parseFloat(e.target.value) / 100) *
                                    parseFloat(supplierPrice)))
                            }
                        }
                    />
                </Grid>
                <Grid item>
                    <TextField
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="Наценка Руб."
                        id="percent"
                        type="number"
                        value={markup.toFixed(2)}
                        onChange={(e) => {
                            setMarkup(format(e.target.value));
                            setMarkupPercent(format((parseFloat(e.target.value))
                                / parseFloat(supplierPrice) * 100));
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        disabled
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="НДС розничный"
                        id="percent"
                        type="number"
                        value={vatSum.toFixed(2)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        disabled
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="Цена розничная"
                        id="percent"
                        type="number"
                        value={priceSum.toFixed(2)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="Количество"
                        id="percent"
                        type="number"
                        value={number}
                        onChange={(e) => (setNumber(parseInt(e.target.value)))}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        disabled
                        sx={{width: 300}}
                        margin="dense"
                        variant="outlined"
                        label="Сумма розничная"
                        id="percent"
                        type="number"
                        value={result.toFixed(2)}
                    />
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <Grid item>
                    <Button
                        onClick={() => {
                            try {
                                props.saveArrival(
                                    {
                                        departmentId: selDepartment.id,
                                        productId: selProduct.id,
                                        supplierId: selSupplier.id,
                                        vatId: selVat.id,
                                        supplierPrice,
                                        supplierVat,
                                        markupPercent,
                                        markupSum: markup,
                                        vatRetail: vatSum,
                                        price: priceSum,
                                        number
                                    }
                                ).then(s =>
                                    (toast.success("Поступление успешно сохранено"))
                                ).catch(e => (toast.error("Ошибка")));
                            } catch (e) {
                                toast.error("Ошибка")
                            }
                        }
                        }
                    >
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
            <ToastContainer/>
        </Box>
    );
};

export default GoodsArrival;