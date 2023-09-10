import { BaseLayoutTitle } from "../../Components"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { backend_url } from "../../../../constants"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../contexts"
import { useQueryParam, JsonParam, StringParam } from "use-query-params"
import UserInfo from "./Components/UserInfo"
import LayoutMainWrapper from "./LayoutMainWrapper"
import TypeForm from "./Components/TypeForm"
import AddressForm from "./Components/AddressForm"
import ZoomForm from "./Components/ZoomForm"
import StatusForm from "./Components/StatusForm"
import DateForm from "./Components/DateForm"
import NotesForm from "./Components/NotesForm"
import ResultModal from "./ResultModal"


export default function LayoutMain({user}){
    const {authFetch} = useContext(UserContext)
    const [type, setType] = useState(true)
    const [address, setAddress] = useState("")
    const [createZoomLink, setCreateZoomLink] = useState(true)
    const [status, setStatus] = useState("pending")
    const [date, setDate] = useQueryParam("date", JsonParam)
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

            <LayoutMainWrapper>
                <LayoutMainWrapper.Card>
                    <LayoutMainWrapper.Card.Header>
                        Заповніть дані про консультацію
                    </LayoutMainWrapper.Card.Header>

                    <Card.Body>
                        <LayoutMainWrapper.Card.HeadForm>
                            <LayoutMainWrapper.Card.Text>
                                {`Обраний користувач: ${user ? user : ""}`}
                            </LayoutMainWrapper.Card.Text>

                            <UserInfo userId={user}/>
                        </LayoutMainWrapper.Card.HeadForm>

                        <LayoutMainWrapper.Card.Form>
                            <LayoutMainWrapper.Card.Text>
                                Оберіть тип консультації
                            </LayoutMainWrapper.Card.Text>
                            
                            <TypeForm type={type} setType={setType}/>
                        </LayoutMainWrapper.Card.Form>

                        <LayoutMainWrapper.Card.Form>
                            <LayoutMainWrapper.Card.Text>
                                Введіть адресу(якщо потрібно)
                            </LayoutMainWrapper.Card.Text>

                            <AddressForm address={address} setAddress={setAddress}/>
                        </LayoutMainWrapper.Card.Form>

                        <LayoutMainWrapper.Card.Form>
                            <LayoutMainWrapper.Card.Text>
                                Створити міт в Zoom?
                            </LayoutMainWrapper.Card.Text>

                            <ZoomForm createZoomLink={createZoomLink} setCreateZoomLink={setCreateZoomLink}/>
                        </LayoutMainWrapper.Card.Form>

                        <LayoutMainWrapper.Card.Form>
                            <LayoutMainWrapper.Card.Text>
                                Оберіть статус консультації
                            </LayoutMainWrapper.Card.Text>

                            <StatusForm status={status} setStatus={setStatus}/>
                        </LayoutMainWrapper.Card.Form>

                        <LayoutMainWrapper.Card.Form>
                            <LayoutMainWrapper.Card.Text>
                                Оберіть дату консультації
                            </LayoutMainWrapper.Card.Text>

                            <DateForm date={date} setDate={setDate} />
                        </LayoutMainWrapper.Card.Form>

                        <LayoutMainWrapper.Card.Form>
                            <LayoutMainWrapper.Card.Text>
                                Введіть замітки
                            </LayoutMainWrapper.Card.Text>

                            <NotesForm notes={notes} setNotes={setNotes}/>
                        </LayoutMainWrapper.Card.Form>

                        <LayoutMainWrapper.Card.Footer>
                            <LayoutMainWrapper.Card.DangerText>
                                {date ? "" : "Ви не обрали дату"}
                            </LayoutMainWrapper.Card.DangerText>
                            <LayoutMainWrapper.Card.DangerText>
                                {user ? "" : "Ви не обрали користувача"}
                            </LayoutMainWrapper.Card.DangerText>

                            <Button onClick={handleClick} variant="outline-dark" size="md">
                                Записати
                            </Button>
                        </LayoutMainWrapper.Card.Footer>

                    </Card.Body>
                </LayoutMainWrapper.Card>
            </LayoutMainWrapper>
        </Container>
    )
}