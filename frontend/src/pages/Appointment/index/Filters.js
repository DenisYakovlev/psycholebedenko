import Container from "react-bootstrap/Container"
import DropDown from "react-bootstrap/Dropdown"
import Form from "react-bootstrap/Form"


const StateFilter = ({state, setState}) => {
    return (
        <DropDown>
            <DropDown.Toggle variant="outline-dark" className="border-0">
                Стан
            </DropDown.Toggle>

            <DropDown.Menu align="end">
                <Container className="px-3">
                    <Form.Check>
                        <Form.Check.Label htmlFor="appointment-state-any">
                            Будь-який
                        </Form.Check.Label>
                        <Form.Check.Input
                            value=""
                            defaultChecked={state != "active" && state != "outdated"}
                            onClick={e => setState(e.target.value)}
                            type="radio"
                            name="appointment-state-group" 
                            id="appointment-state-any"
                        />
                    </Form.Check>
                </Container>

                <Container className="px-3">
                    <Form.Check>
                        <Form.Check.Label htmlFor="appointment-state-active">
                            Активний
                        </Form.Check.Label>
                        <Form.Check.Input
                            value="active"
                            defaultChecked={state == "active"}
                            onClick={e => setState(e.target.value)}
                            type="radio"
                            name="appointment-state-group" 
                            id="appointment-state-active"
                        />
                    </Form.Check>
                </Container>

                <Container className="px-3">
                    <Form.Check>
                        <Form.Check.Label htmlFor="appointment-state-outdated">
                            Минулий
                        </Form.Check.Label>
                        <Form.Check.Input
                            value="outdated"
                            defaultChecked={state == "outdated"}
                            onClick={e => setState(e.target.value)}
                            type="radio"
                            name="appointment-state-group" 
                            id="appointment-state-outdated"
                        />
                    </Form.Check>
                </Container>
            </DropDown.Menu>
        </DropDown>
    )
}


const StatusFilter = ({status, setStatus}) => {
    const handleChange = e => {
        const value = e.target.value

        //handle add and delete to array
        if([...status].includes(value)){
            const newStatusList = [...status].filter(status => status != value)
            setStatus([...newStatusList])
        }
        else{
            setStatus([...status, value])
        }
    }

    return (
        <DropDown>
            <DropDown.Toggle variant="outline-dark" className="border-0">
                Статус
            </DropDown.Toggle>

            <DropDown.Menu align="end">
                <Container className="px-3">
                    <Form.Check>
                        <Form.Check.Label htmlFor="appointment-status-pending">
                            В обробці
                        </Form.Check.Label>
                        <Form.Check.Input
                            value="pending"
                            defaultChecked={[...status].includes("pending")}
                            onClick={handleChange}
                            type="checkbox"
                            id="appointment-status-pending"
                        />
                    </Form.Check>
                </Container>

                <Container className="px-3">
                    <Form.Check>
                        <Form.Check.Label htmlFor="appointment-status-appointed">
                            Назначено
                        </Form.Check.Label>
                        <Form.Check.Input
                            value="appointed"
                            defaultChecked={[...status].includes("appointed")}
                            onClick={handleChange}
                            type="checkbox"
                            id="appointment-status-appointed"
                        />
                    </Form.Check>
                </Container>

                <Container className="px-3">
                    <Form.Check>
                        <Form.Check.Label htmlFor="appointment-status-complete">
                            Виконано
                        </Form.Check.Label>
                        <Form.Check.Input
                            value="complete"
                            defaultChecked={[...status].includes("complete")}
                            onClick={handleChange}
                            type="checkbox"
                            id="appointment-status-complete"
                        />
                    </Form.Check>
                </Container>

                <Container className="px-3">
                    <Form.Check>
                        <Form.Check.Label htmlFor="appointment-status-denied">
                            Відмінено
                        </Form.Check.Label>
                        <Form.Check.Input
                            value="denied"
                            defaultChecked={[...status].includes("denied")}
                            onClick={handleChange}
                            type="checkbox"
                            id="appointment-status-denied"
                        />
                    </Form.Check>
                </Container>
            </DropDown.Menu>
        </DropDown>
    )
}


export default function Filters({state, setState, status, setStatus}){
    return (
        <Container
            style={{minWidth: "350px", maxWidth: "100vw", width: "1200px"}} 
            className="mt-3 p-0 px-5 d-flex justify-content-lg-start justify-content-center align-items-center gap-3" 
            fluid
        >
            <StatusFilter
                status={status}
                setStatus={setStatus} 
            />

            <StateFilter 
                state={state}
                setState={setState}
            />
        </Container>
    )
}