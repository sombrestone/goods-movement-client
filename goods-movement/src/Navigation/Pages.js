import {UserFunc} from "../Store/UserStore";

const roles=UserFunc().Roles;

export const routes=Object.freeze({
    SUBDIVISION: "/directory/subdivision",
    SHOP: "/directory/shops",
    SUPPLIERS: "/directory/suppliers",
    NOMENCLATURE: "/directory/nomenclature",
    UNIT: "/directory/unit",
    VAT: "/directory/VAT",
    EMPLOYEES: "/directory/employees",

    GOODSARRIVAL: "/operations/goods-arrival",
    GOODSMOVEMENT: "/operations/goods-movement",
    PURCHASERETURNS: "/operations/purchase-returns",
    SALES: "/operations/sales",

    BALANCESHEET: "/reports/balance-sheet",
    BILLOFMOVEMENT: "/reports/bill-of-movement",

    LOGIN: "/login"
});


export const menus=[
    {
        name: 'Справочники',
        submenus:[
            {
                name: 'Подразделения',
                roles: [roles.ADMIN,roles.EXPERT,roles.MANAGER],
                route: routes.SUBDIVISION
            },
            {
                name: 'Магазины',
                roles: [roles.ADMIN,roles.EXPERT,roles.MANAGER],
                route: routes.SHOP
            },
            {
                name: 'Поставщики',
                roles: [roles.ADMIN,roles.EXPERT,roles.MANAGER],
                route: routes.SUPPLIERS
            },
            {
                name: 'Номенклатура',
                roles: [roles.ADMIN,roles.EXPERT,roles.MANAGER],
                route: routes.NOMENCLATURE
            },
            {
                name: 'Еденицы измерения',
                roles: [roles.ADMIN,roles.EXPERT,roles.MANAGER],
                route: routes.UNIT
            },
            {
                name: 'Ставки НДС',
                roles: [roles.ADMIN,roles.EXPERT,roles.MANAGER],
                route: routes.VAT
            },
            {
                name: 'Сотрудники',
                roles: [roles.ADMIN],
                route: routes.EMPLOYEES
            }
        ]
    },
    {
        name: "Операции",
        submenus: [
            {
                name: 'Поступление товара',
                roles: [roles.MANAGER, roles.EXPERT],
                route: routes.GOODSARRIVAL
            },
            {
                name: 'Перемещение товара',
                roles: [roles.MANAGER],
                route: routes.GOODSMOVEMENT
            },
            {
                name: 'Возврат товара',
                roles: [roles.MANAGER],
                route: routes.PURCHASERETURNS
            },
            {
                name: 'Продажи',
                roles: [roles.MANAGER],
                route: routes.SALES
            },
        ]
    },
    {
        name: "Отчеты",
        submenus: [
            {
                name: 'Ведомость остатков',
                roles: [roles.MANAGER,roles.SELLER],
                route: routes.BALANCESHEET
            },
            {
                name: 'Ведомость движения',
                roles: [roles.MANAGER,roles.SELLER],
                route: routes.BILLOFMOVEMENT
            },
        ]
    }
];


export const availableMenu=(role)=>{
    let result=[];
    menus.forEach((menu)=>{
        let newMenu=[]
       menu.submenus.forEach((submenu)=>{
           if (submenu.roles.some((x)=>x===role)) newMenu.push(submenu);
       });
        if (newMenu.length>0) result.push({
            name: menu.name,
            submenus: newMenu
        })
    });
    return result;
};

export const availableRoutes=(role)=> {
    let result=[];
    availableMenu(role).forEach((menu)=>{
        menu.submenus.forEach((submenu)=>{
            result.push(submenu);
        });
    })
    return result;
};
