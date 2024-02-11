import { useState } from "react";
import { ObjSearchFilter } from "../../../Components";
import UserMiniCard from "../../../Users/Index/UserMiniCard";
import { JsonParam, StringParam, useQueryParam } from "use-query-params";


export default function UserForm({user, onChange}){
    const [users, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useQueryParam('user', JsonParam)

    const handleChange = _user => {
        setSelectedUser(_user)
        onChange(_user)
    }

    return (
        <ObjSearchFilter 
            obj={users}
            setObj={setUsers}
            ObjComponent={UserMiniCard}
            setSelectedObj={handleChange}
            apiUrl="user"
            searchPlaceholder="Введіть номер тел./юзернейм"
        />
    )
}