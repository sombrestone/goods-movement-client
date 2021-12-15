import AppMenu from './Components/Menu/AppMenu';
import React, {createContext, useContext, useEffect, useState} from "react";
import UserStore, {UserFunc} from "./Store/UserStore";
import {availableRoutes,routes} from './Navigation/Pages'
import Subdivision from "./Pages/Directories/Subdivision";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductStore} from "./Store/ProductStore";
import {getUnits} from "./Http/ProductApi";
import Unit from "./Pages/Directories/Unit";

export const Context = createContext(null);

function App() {
    const [user, setUser] = useState(UserStore());
    const [products,setProducts] = useState(ProductStore())

    let content = availableRoutes(user.role).map((content) => {
        switch (content.route) {
            case routes.SUBDIVISION:
                return <Route path={routes.SUBDIVISION} element={<Subdivision/>}/>;
            case routes.UNIT:
                return <Route path={routes.UNIT} element={<Unit/>}/>;
        }
    }).filter((x) => x != null);

    useEffect(()=>{
        getUnits().then(data=>{
            let newState={...products};
            newState.units=data;
            setProducts(newState);

        });

    });

    return (
        <div>
            <Context.Provider value={
                //[user, setUser, UserFunc,products,setProducts]
                {
                    user,
                    setUser,
                    products,
                    setProducts
                }
            }>
                    <AppMenu/>
                    <Routes>
                        {content}
                    </Routes>
            </Context.Provider>
        </div>
    );
}

export default App;
