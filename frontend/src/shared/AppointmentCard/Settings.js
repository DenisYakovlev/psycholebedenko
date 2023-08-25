import Dropdown from "react-bootstrap/Dropdown"
import Accordion from "react-bootstrap/Accordion"
import { useContext, useEffect, useState } from "react"
import { backend_url } from "../../constants"
import { UserContext } from "../../contexts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faGear, faXmark, faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import DeleteModal from "./DeleteModal"
import UpdateModal from "./UpdateModal"
import StatusModal from "./StatusModal"


export default function Settings({appointment, onChange, onDelete}){
    const {authFetch} = useContext(UserContext)
    const [isStaff, setIsStaff] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [updateModalShow, setUpdateModalShow] = useState(false)
    const [statusModalShow, setStatusModalShow] = useState(false)

    useEffect(() => {
        authFetch(`${backend_url}/user/me`, {
            "method": "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Appointment Card user fetch error")
        })
        .then(user => setIsStaff(user.is_staff))
        .catch(error => console.log(error))
    }, [])

    const handleDelete = () => {
        authFetch(`${backend_url}/appointment/${appointment.id}`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Appointment delete error")
        })
        .then(data => onDelete(data))
        .catch(error => console.log(error))
    }

    const handleUpdate = body => {
        authFetch(`${backend_url}/appointment/${appointment.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "Application/json"
            }
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Appointment update error")
        })
        .then(data => onChange(data))
        .catch(error => console.log(error))
    }

    const _handleDelete = () =>{
        setDeleteModalShow(true)
    }

    const _handleStatusUpdate = () => {
        setStatusModalShow(true)
    }

    const _handleUpdate = () => {
        setUpdateModalShow(true)
    }

    return (
        <Dropdown>
            <Dropdown.Toggle  as={FontAwesomeIcon} style={{cursor: "pointer"}} icon={faEllipsis} />
            <Dropdown.Menu align="end">
                <Dropdown.Item onClick={_handleUpdate} disabled={appointment.outdated}>
                    <FontAwesomeIcon style={{width: "16px", cursor: "pointer"}} className="pe-1" icon={faGear}/>
                    Редагувати дату
                </Dropdown.Item>
                {isStaff ?
                    <Dropdown.Item onClick={_handleStatusUpdate} disabled={appointment.outdated}>
                        <FontAwesomeIcon style={{width: "16px", cursor: "pointer"}} className="pe-1" icon={faCircleNotch}/>
                        Редагувати статус
                    </Dropdown.Item>
                    :
                    <></>
                }
                <Dropdown.Item onClick={_handleDelete} disabled={appointment.outdated}>
                    <FontAwesomeIcon style={{width: "16px", cursor: "pointer"}} className="pe-1" icon={faXmark}/>
                    Видалити
                </Dropdown.Item>
            </Dropdown.Menu>

            <DeleteModal 
                show={deleteModalShow} hide={() => setDeleteModalShow(false)}
                handleDelete={handleDelete}
            />
            <UpdateModal 
                show={updateModalShow} hide={() => setUpdateModalShow(false)} 
                handleUpdate={handleUpdate}
            />
            <StatusModal 
                show={statusModalShow} hide={() => setStatusModalShow(false)}
                handleStatusUpdate={handleUpdate}
            />
        </Dropdown>
    )
}   