import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"
import TextEditingModal from "./TextEditingModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExpand } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


export default function MainTextForm({text, onChange}){
    const [showModal, setShowModal] = useState(false)

    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <TextEditingModal 
                show={showModal} 
                hide={() => setShowModal(false)}
                text={text}
                setText={onChange}
            />

            <Container className="p-0 d-flex justify-content-between align-items-center">
                <FormTitle>
                    Введіть Головний текст
                </FormTitle>

                <FontAwesomeIcon  
                    className="pe-4 fs-5 text-dark"
                    icon={faExpand}
                    onClick={() => setShowModal(true)}
                />
            </Container> 

            <Container className="px-3">
                <Form.Control
                    className="text-break"
                    value={text}
                    onChange={onChange}
                    as="textarea" rows={5}
                />
            </Container>
        </Container>
    )
}