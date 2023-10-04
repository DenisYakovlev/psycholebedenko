import Container from "react-bootstrap/Container"
import TextEditingModal from "./TextEditingModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExpand } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


export default function TextEditingTag({text, onChange}){
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <TextEditingModal 
                show={showModal} 
                hide={() => setShowModal(false)}
                text={text}
                setText={onChange}
            />

            <FontAwesomeIcon  
                className="p-0 m-0 fs-5 text-dark"
                icon={faExpand}
                style={{cursor: "pointer"}}
                onClick={() => setShowModal(true)}
            />
        </>
    )
}