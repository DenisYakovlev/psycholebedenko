import { BaseLayoutTitle } from "../../Components"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Wrapper from "./LayoutSideWrapper"
import UserForm from "./Forms/UserForm"
import OnlineForm from "./Forms/OnlineForm"
import AddressForm from "./Forms/AddressForm"
import ZoomForm from "./Forms/ZoomForm"
import StatusForm from "./Forms/StatusForm"
import DateForm from "./Forms/DateForm"
import NotesForm from "./Forms/NotesForm"
import ResultModal from "./ResultModal"
import { useContext, useState } from "react"
import { backend_url } from "../../../../constants"
import { UserContext } from "../../../../contexts"


export default function LayoutSide({card, setCard}){
    const {authFetch} = useContext(UserContext)
    const [showResult, setShowResult] = useState(false)
    const [resultType, setResultType] = useState(null)

    const handleChange = (key, value) => {
        setCard({...card, [key] : value})
    }

    const handleClick = () => {
        authFetch(`${backend_url}/appointment/`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                online: card.online,
                address: card.address,
                user: card.user.id,
                create_zoom_link: card.create_zoom_link,
                status: card.status,
                date: card.date.id,
                notes: card.notes,
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

    return(
        <Container className="p-0" fluid>
            <ResultModal show={showResult} hide={() => setShowResult(false)} resultType={resultType}/>

            <BaseLayoutTitle>
                Параметри
            </BaseLayoutTitle>

            <Wrapper>
                <Wrapper.Item>
                    <Wrapper.Title>
                        Оберіть Користувача
                    </Wrapper.Title>

                    <Wrapper.Body>
                        <UserForm 
                            user={card.user}
                            onChange = {value => handleChange("user", value)} 
                        />
                    </Wrapper.Body>
                </Wrapper.Item>

                <Wrapper.Item>
                    <Wrapper.Title>
                        Оберіть тип Консультації
                    </Wrapper.Title>

                    <Wrapper.Body>
                        <OnlineForm 
                            online={card.online}
                            onChange={e => handleChange("online", e.target.value == "true")}
                        />
                    </Wrapper.Body>
                </Wrapper.Item>

                <Wrapper.Item>
                    <Wrapper.Title>
                        Введіть адресу(якщо потрібно)
                    </Wrapper.Title>

                    <Wrapper.Body>
                        <AddressForm 
                            address={card.address}
                            onChange={e => handleChange("address", e.target.value)}
                        />
                    </Wrapper.Body>
                </Wrapper.Item>

                <Wrapper.Item>
                    <Wrapper.Title>
                        Створити міт в Zoom?
                    </Wrapper.Title>

                    <Wrapper.Body>
                        <ZoomForm
                            value={card.create_zoom_link}
                            onChange={e => handleChange("create_zoom_link", e.target.value == "true")}
                        />
                    </Wrapper.Body>
                </Wrapper.Item>
                
                <Wrapper.Item>
                    <Wrapper.Title>
                        Оберіть статус Консультації
                    </Wrapper.Title>

                    <Wrapper.Body>
                        <StatusForm 
                            status={card.status}
                            onChange={e => handleChange("status", e.target.value)}
                        />
                    </Wrapper.Body>
                </Wrapper.Item>

                <Wrapper.Item>
                    <Wrapper.Title>
                        Оберіть дату Консультації
                    </Wrapper.Title>

                    <Wrapper.Body>
                        <DateForm
                            date={card.date}
                            setDate={value => handleChange("date", value)}
                        />
                    </Wrapper.Body>
                </Wrapper.Item>

                <Wrapper.Item>
                    <Wrapper.Title>
                        Введіть замітки
                    </Wrapper.Title>

                    <Wrapper.Body>
                        <NotesForm
                            notes={card.notes}
                            onChange={e => handleChange("notes", e.target.value)} 
                        />
                    </Wrapper.Body>
                </Wrapper.Item>

                <Container className="p-0 my-5 d-flex justify-content-center align-items-center">
                    <Button 
                        disabled={!card.user || !card.date}
                        onClick={handleClick} 
                        variant="outline-dark" 
                        size="lg"
                    >
                        Зберегти
                    </Button>
                </Container>
            </Wrapper>
        </Container>
    )
}