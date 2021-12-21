import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Autocomplete, TextField} from "@mui/material";


const GoodsArrival = (props) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Grid item>
                    <Autocomplete
                        id="controllable-states-demo"
                        options={[1,2,3]}
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
                            id="controllable-states-demo"
                            options={[1,2,3]}
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
                            id="controllable-states-demo"
                            options={[1,2,3]}
                            sx={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField  fullWidth
                                            margin="dense"
                                            variant="outlined" {...params}
                                            label="Товар" />}
                        />
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            id="controllable-states-demo"
                            options={[1,2,3]}
                            sx={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField  fullWidth
                                            margin="dense"
                                            variant="outlined" {...params}
                                            label="Поставщик" />}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GoodsArrival;