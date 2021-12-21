const Roles=Object.freeze({
    ADMIN: "admin",
    EXPERT: "expert",
    MANAGER: "manager",
    SELLER: "seller"
});

const RoleName=(role)=> {
    switch (role) {
        case Roles.ADMIN:
            return "Администратор";
        case Roles.EXPERT:
            return "Товаровед";
        case Roles.MANAGER:
            return "Мэнеджер";
        case Roles.SELLER:
            return "Продавец";
        default: return "Ошибка";
    }
}


const UserStore=()=>{
    return {
        isAuth: false,
        role: null,
        firstname: null,
        lastname: null,
        patronymic: null
    }
};

export default UserStore;

export const UserFunc=()=>({
    Roles,
    RoleName
});