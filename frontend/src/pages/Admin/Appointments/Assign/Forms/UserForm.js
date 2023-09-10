import { useState } from "react";
import { UserSearchFilter } from "../../../Components";
import { JsonParam, StringParam, useQueryParam } from "use-query-params";


export default function UserForm({user, onChange}){
    const [users, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useQueryParam('user', JsonParam)

    const handleChange = _user => {
        setSelectedUser(_user)
        onChange(_user)
    }

    return (
        <UserSearchFilter
            users={users}
            setUsers={setUsers}
            setSelectedUser={handleChange}
        />
    )
}