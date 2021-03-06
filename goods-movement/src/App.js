import AppMenu from './Components/Menu/AppMenu';
import React, {createContext, useContext, useEffect, useState} from "react";
import UserStore, {UserFunc} from "./Store/UserStore";
import Store from './Store/index';
import {availableRoutes,routes} from './Navigation/Pages'
import Subdivision from "./Pages/Directories/Subdivision";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {ProductStore} from "./Store/ProductStore";
import {addProduct, addUnit, delProduct, delUnit, getProducts, getUnits, putProduct, putUnit} from "./Http/ProductApi";
import Unit from "./Pages/Directories/Unit";
import {
    addShop, addSubdivision,
    addSupplier,
    addVat, addWorker, delShop, delSubdivision,
    delSupplier,
    delVat, delWorker,
    getShops, getSubdivisions,
    getSuppliers,
    getVats, getWorkers, putShop, putSubdivision,
    putSupplier,
    putVat
} from "./Http/StoreApi";
import Suppliers from "./Pages/Directories/Suppliers";
import Vat from "./Pages/Directories/Vat";
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import {check, login} from "./Http/UserApi";
import Products from "./Pages/Directories/Products";
import Shops from "./Pages/Directories/Shops";
import GoodsArrival from "./Pages/Operations/GoodsArrival";
import {getBalance, getMovement, getSmartBalance, saveArrival, saveMove, saveReturn, saveSale} from "./Http/Operations";
import Sales from "./Pages/Operations/Sales";
import Movement from "./Pages/Operations/Movement";
import Balance from "./Pages/Operations/Balance";
import MovementReport from "./Pages/Operations/MovementReport";
import "react-toastify/dist/ReactToastify.css";
import Workers from "./Pages/Directories/Workers";

export const Context = createContext(null);

function App() {
    const [user, setUser] = useState(UserStore());
    const [products,setProducts] = useState(ProductStore());
    const [store,setStore]= useState(Store());

    useEffect(() => {
        check().then(data => {
            setUser(data);
        }).catch(x=>(setUser({
            isAuth: false,
            role: null,
            firstname: null,
            lastname: null,
            patronymic: null
        })));
    }, []);

    let content = availableRoutes(user.role).map((content) => {
        switch (content.route) {
            case routes.SUBDIVISION:
                return <Route path={routes.SUBDIVISION} element=
                    {<Subdivision
                        get={getSubdivisions}
                        add={addSubdivision}
                        delete={delSubdivision}
                        update={putSubdivision}
                        getShops={getShops}
                    />}/>;
            case routes.UNIT:
                return <Route path={routes.UNIT} element=
                    {<Unit
                        get={getUnits}
                        add={addUnit}
                        delete={delUnit}
                        update={putUnit}
                    />}/>;
            case routes.SUPPLIERS:
                return <Route path={routes.SUPPLIERS} element=
                    {<Suppliers
                        get={getSuppliers}
                        add={addSupplier}
                        delete={delSupplier}
                        update={putSupplier}
                    />}/>;
            case routes.VAT:
                return <Route path={routes.VAT} element=
                    {<Vat
                        get={getVats}
                        add={addVat}
                        delete={delVat}
                        update={putVat}
                    />}/>;
            case routes.NOMENCLATURE:
                return <Route path={routes.NOMENCLATURE} element=
                    {<Products
                        get={getProducts}
                        add={addProduct}
                        delete={delProduct}
                        update={putProduct}
                        getUnit={getUnits}
                    />}/>;
            case routes.SHOP:
                return <Route path={routes.SHOP} element=
                    {<Shops
                        get={getShops}
                        add={addShop}
                        delete={delShop}
                        update={putShop}
                    />}/>;
            case routes.GOODSARRIVAL:
                return <Route path={routes.GOODSARRIVAL} element=
                    {<GoodsArrival
                        getShops={getShops}
                        getDepartments={getSubdivisions}
                        getProducts={getProducts}
                        getSuppliers={getSuppliers}
                        getVats={getVats}
                        saveArrival={saveArrival}
                    />}/>;
            case routes.SALES:
                return <Route path={routes.SALES} element=
                    {<Sales
                        getShops={getShops}
                        getDepartments={getSubdivisions}
                        getSmartBalance={getSmartBalance}
                        saveSale={saveSale}
                        title={'?????????????? ????????????'}
                    />}/>;
            case routes.PURCHASERETURNS:
                return <Route path={routes.PURCHASERETURNS} element=
                    {<Sales
                        getShops={getShops}
                        getDepartments={getSubdivisions}
                        getSmartBalance={getSmartBalance}
                        saveSale={saveReturn}
                        title={'?????????????? ????????????'}
                    />}/>;
            case routes.GOODSMOVEMENT:
                return <Route path={routes.GOODSMOVEMENT} element=
                    {<Movement
                        getShops={getShops}
                        getDepartments={getSubdivisions}
                        getSmartBalance={getSmartBalance}
                        saveMove={saveMove}
                    />}/>;
            case routes.BALANCESHEET:
                return <Route path={routes.BALANCESHEET} element=
                    {<Balance
                        getShops={getShops}
                        getDepartments={getSubdivisions}
                        getBalance={getBalance}
                    />}/>;
            case routes.BILLOFMOVEMENT:
                return <Route path={routes.BILLOFMOVEMENT} element=
                    {<MovementReport
                        getMovement={getMovement}
                        getShops={getShops}
                        getDepartments={getSubdivisions}
                    />}/>;
            case routes.EMPLOYEES:
                return <Route path={routes.EMPLOYEES} element=
                    {<Workers
                        get={getWorkers}
                        add={addWorker}
                        delete={delWorker}
                        update={putShop}
                    />}/>;
        }
    }).filter((x) => x != null);


    const navigate = useNavigate;

    if (!user.isAuth) {
        content.push(<Route path={'/login'} element=
            {<Login login={login}/>}/>);
        content.push(<Route path={'/registration'} element=
            {<Registration/>}/>);
    }

    return (
        <div>
            <Context.Provider value={
                {
                    user,
                    setUser,
                    products,
                    setProducts,
                    store,
                    setStore
                }
            }>
                    <AppMenu/>
                    <Routes>
                        {content}

                    </Routes>
                {(!user.isAuth)?<Login login={login}/>:""}
            </Context.Provider>
        </div>
    );
}

export default App;
