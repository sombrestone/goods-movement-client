import React, {useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Button, ButtonGroup} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddModal from "./AddModal";
import {ToastContainer} from "react-toastify";

const CrudTable = (props) => {
    const {columns,rows,add,remove,update}=props;

    const [selectedRows,setSelectedRows]=useState([]);

    const [showModal,setShowModal]=useState(false);

    const [addMode,setAddMode]=useState(true);

    const [state,setState]=props.state;

    const handleOpen = () => {
        setState(props.emptyState);
        setAddMode(true);
        setShowModal(true);
    };

    const handleUpdate=()=>{
        setState(selectedRows[0]);
        setAddMode(false);
        setShowModal(true);
    }
    const handleClose = () => setShowModal(false);

    rows?.forEach((value,index)=>{
        value["num"]=index+1;
    });

    const Add=(arg)=>{
        add(arg);
    }

    const Upd=(arg)=>{
        update(arg);
    }

    const localizedTextsMap = {
        columnMenuUnsort: "Отменить сортировку",
        columnMenuSortAsc: "Сортировка по возрастанию",
        columnMenuSortDesc: "Сортировка по убыванию",
        columnMenuFilter: "Фильтрация",
        columnMenuHideColumn: "Скрыть стобец",
        columnMenuShowColumns: "Показать столбец"
    };

    return (

        <div style={{ height: 600, width: '100%'}}>
            <ButtonGroup
                disableElevation variant="contained"
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpen}
                >
                    Добавить
                </Button>

                {(selectedRows.length>0)?
                    <Button
                        onClick={handleUpdate}
                    >
                        Изменить
                    </Button>
                    :
                    null
                }

                {(selectedRows.length>0)?
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon/>}
                        color="error"
                        onClick={()=>selectedRows.forEach(x=>props.remove(x.id))}
                    >
                        Удалить
                    </Button>
                    :
                    null
                }
            </ButtonGroup>
            <DataGrid
                localeText={localizedTextsMap}
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selected = rows.filter((row) =>
                        selectedIDs.has(row.id),
                    );
                    setSelectedRows(selected);
                }}
                disableSelectionOnClick
            />
            <AddModal
                open={showModal}
                handleClose={handleClose}
                form={props.form}
                title={(addMode)?
                    props.modalTitle.add
                    :props.modalTitle.upd}
                event={(addMode)?Add:Upd}
                state={[state,setState]}
                mode={addMode}
                vars={props.vars}
            />
            <ToastContainer/>
        </div>
    );
};

export default CrudTable;