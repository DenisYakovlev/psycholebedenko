import Container from "react-bootstrap/Container"
import { BaseLayoutTitle, UsersList } from "../../Components"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../contexts"
import { backend_url } from "../../../../constants"
import { useNavigate } from "react-router"
import UserCard from "../../Components/UserCard"


export default function LayoutMain({selectedEvent}){
    let navigate = useNavigate()
    const {authFetch} = useContext(UserContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(!selectedEvent){
            return
        }

        authFetch(`${backend_url}/event/${selectedEvent}/participants`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin Event Participants fetch error")
        })
        .then(data => setUsers(data))
        .catch(error => console.log(error))
    }, [selectedEvent])

    
    const handleSelect = id => {
        navigate(`/admin/users?user=${id}`)
    }

    return (
        <Container className="p-0" fluid>
            <BaseLayoutTitle>
                Записані Користувачі
            </BaseLayoutTitle>


            <Container className="p-0 d-flex flex-column align-items-center" fluid>
                {Object.values(users).map(user =>
                    <UserCard 
                        key={user.id}
                        user={user}
                        setSelectedUser={() => handleSelect(user.id)}
                    />
                )}
            </Container>
        </Container>
    )
}