import { BaseLayoutTitle } from "../../Components"
import DatePicking from "../../../Appointment/create/DatePicking"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { formatDate } from "../../../utils"
import { backend_url } from "../../../../constants"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../contexts"
import ResultModal from "./ResultModal"


// need to refactor. Extremely poor written code
// need to split components to different files
export default function LayoutMain({user}){
    const {authFetch} = useContext(UserContext)
    const [type, setType] = useState(true)
    const [address, setAddress] = useState("")
    const [createZoomLink, setCreateZoomLink] = useState(true)
    const [status, setStatus] = useState("pending")
    const [date, setDate] = useState(null)
    const [notes, setNotes] = useState("")
    const [showResult, setShowResult] = useState(false)
    const [resultType, setResultType] = useState(null)

    
    const handleClick = () => {
        if(!date){
            return
        }

        authFetch(`${backend_url}/appointment/`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                online: type,
                address: address,
                user: user,
                create_zoom_link: createZoomLink,
                status: status,
                date: date.id,
                notes: notes,
            })
        })
        .then(response => {
            if(response.status == 201){
                setResultType("success")
                setShowResult(true)
                return response.json()
            }

            throw new Error("Admin post appointment error")
        })
        .catch(error => {
            setResultType("conflict")
            setShowResult(true)
            console.log(error)
        })
    }

    if(!user){
        return
    }

    return (
        <Container className="p-0" fluid>
            <ResultModal show={showResult} hide={() => setShowResult(false)} resultType={resultType}/>

            <BaseLayoutTitle>
                Конфігурація
            </BaseLayoutTitle>

            <Container className="my-5 p-0 d-flex justify-content-center align-items-center" fluid>
                <Card style={{minWidth: "350px", maxWidth: "600px"}} bg="light" data-bs-theme="light" className="m-0 p-0 border-0 rounded shadow">
                    <Card.Header className="bg-light fs-5 text-dark text-semibold text-justify">
                        Заповніть дані про консультацію
                    </Card.Header>
                    <Card.Body>
                        <Container className="m-0 px-0 pb-3 d-flex flex-column border-bottom border-secondary">
                            <Card.Text className="p-0 text-dark fs-6 text-justify">
                                {`Обраний користувач: ${user ? user : ""}`}
                            </Card.Text>
                        </Container>

                        <Container className="m-0 px-0 py-3 d-flex flex-column border-bottom border-secondary">
                            <Card.Text className="p-0 text-dark fs-6 text-justify">
                                Оберіть тип консультації
                            </Card.Text>
                            <Form>
                                <Form.Check>
                                    <Form.Check.Input 
                                        value={true} 
                                        defaultChecked={true}
                                        onChange={(e) => setType(e.target.value)}  
                                        name="create-type-form"
                                        type="radio" 
                                        id="create-type-form-online"
                                    />
                                    <Form.Check.Label htmlFor="create-type-form-online">Онлайн</Form.Check.Label>
                                </Form.Check>
                                <Form.Check>
                                    <Form.Check.Input 
                                        value={false} 
                                        onChange={e => setType(e.target.value)}  
                                        name="create-type-form"
                                        type="radio" 
                                        id="create-type-form-offline"
                                    />
                                    <Form.Check.Label htmlFor="create-type-form-offline">Оффлайн</Form.Check.Label>
                                </Form.Check>
                            </Form>
                        </Container>

                        <Container className="m-0 px-0 py-3 d-flex flex-column border-bottom border-secondary">
                            <Card.Text className="p-0 text-dark fs-6 text-justify">
                                Введіть адресу(якщо потрібно)
                            </Card.Text>

                            <Form>
                                <Form.Control value={address} onChange={e => setAddress(e.target.value)}/>
                            </Form>
                        </Container>

                        <Container className="m-0 px-0 py-3 d-flex flex-column border-bottom border-secondary">
                            <Card.Text className="p-0 text-dark fs-6 text-justify">
                                Створити міт в Zoom?
                            </Card.Text>

                            <Form>
                                <Form.Check>
                                    <Form.Check.Input 
                                        value={true} 
                                        defaultChecked={true}
                                        onChange={(e) => setCreateZoomLink(e.target.value)}  
                                        name="create-zoom-form"
                                        type="radio" 
                                        id="create-zoom-form-yes"
                                    />
                                    <Form.Check.Label htmlFor="create-zoom-form-yes">Так</Form.Check.Label>
                                </Form.Check>
                                <Form.Check>
                                    <Form.Check.Input 
                                        value={false} 
                                        onChange={e => setCreateZoomLink(e.target.value)}  
                                        name="create-zoom-form"
                                        type="radio" 
                                        id="create-zoom-form-no"
                                    />
                                    <Form.Check.Label htmlFor="create-zoom-form-no">Ні</Form.Check.Label>
                                </Form.Check>
                            </Form>
                        </Container>

                        <Container className="m-0 px-0 py-3 d-flex flex-column border-bottom border-secondary">
                            <Card.Text className="p-0 text-dark fs-6 text-justify">
                                Оберіть статус консультації
                            </Card.Text>

                            <Form>
                                <Form.Check >
                                    <Form.Check.Input 
                                        value="pending"
                                        defaultChecked={true}
                                        onChange={e => setStatus(e.target.value)}  
                                        name="status-create-group" 
                                        type="radio" 
                                        id="status-create-pending"
                                    />
                                    <Form.Check.Label htmlFor="status-create-pending">в обробці</Form.Check.Label>
                                </Form.Check>

                                <Form.Check>
                                    <Form.Check.Input 
                                        value="appointed" 
                                        onChange={e => setStatus(e.target.value)}  
                                        name="status-create-group" 
                                        type="radio" 
                                        id="status-create-appointed"
                                    />
                                    <Form.Check.Label htmlFor="status-create-appointed">назначено</Form.Check.Label>
                                </Form.Check>

                                <Form.Check>
                                    <Form.Check.Input 
                                        value="complete" 
                                        onChange={e => setStatus(e.target.value)}
                                        name="status-create-group" 
                                        type="radio" 
                                        id="status-create-complete"
                                    />
                                    <Form.Check.Label htmlFor="status-create-complete">виконано</Form.Check.Label>
                                </Form.Check>
                            </Form>
                        </Container>

                        <Container className="m-0 px-0 py-3 border-bottom border-secondary">
                            <Card.Text className="p-0 text-dark fs-6 text-justify">
                                Оберіть дату консультації
                            </Card.Text>

                            <DatePicking sumbitDate={setDate}/>

                            {date ? 
                               <Card.Text className="p-0 text-dark fs-6 text-justify">
                                    {`Обрана дата: ${formatDate(date.date)}`}
                                </Card.Text>
                                :
                                <></>
                            }
                        </Container>

                        <Container className="m-0 px-0 py-3 border-bottom border-secondary">
                            <Card.Text className="p-0 text-dark fs-6 text-justify">
                                Введіть замітки
                            </Card.Text>

                            <Form className="m-0 p-0">
                                <Form.Group>
                                    <Form.Control 
                                        value={notes} onChange={e => setNotes(e.target.value)} 
                                        style={{height: "30vh", minHeight: "200px"}} as="textarea" placeholder="Можна не заповнювати"
                                    />
                                </Form.Group>
                            </Form>
                        </Container>

                        <Container className="m-0 p-0 py-3 d-flex flex-column justify-content-center align-items-center">
                            <Card.Text className="px-0 pt-2 text-danger fs-6 text-justify">
                                {date ? "" : "Ви не обрали дату"}
                            </Card.Text>
                            <Card.Text className="px-0 pt-2 text-danger fs-6 text-justify">
                                {user ? "" : "Ви не обрали користувача"}
                            </Card.Text>

                            <Button onClick={handleClick} variant="outline-dark" size="md">
                                Записати
                            </Button>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </Container>
    )
}