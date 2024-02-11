import { Filters } from "../../Components"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"


export default function StatusFilters({status, setStatus}){
    return (
        <Filters.Body.Layout>
            <Filters.Body.Title>
                Виберіть статус для пошуку
            </Filters.Body.Title>

            <Form className="px-5">
                <Form.Check >
                    <Form.Check.Input 
                        value="active"
                        defaultChecked={status == "active"} 
                        onChange={e => setStatus(e.target.value)}  
                        name="event-outdated-group" 
                        type="radio" 
                        id="event-status-active"
                    />
                    <Form.Check.Label htmlFor="event-status-active">
                        Активні
                    </Form.Check.Label>
                </Form.Check>

                <Form.Check>
                    <Form.Check.Input 
                        value="outdated" 
                        defaultChecked={status == "outdated"}
                        onChange={e => setStatus(e.target.value)}  
                        name="event-outdated-group" 
                        type="radio" 
                        id="event-status-outdated"
                    />
                    <Form.Check.Label htmlFor="event-status-outdated">
                        Минулі
                    </Form.Check.Label>
                </Form.Check>

                <Form.Check>
                    <Form.Check.Input 
                        value="any" 
                        defaultChecked={status == "any"}
                        onChange={e => setStatus(e.target.value)}  
                        name="event-outdated-group" 
                        type="radio" 
                        id="event-status-any"
                    />
                    <Form.Check.Label htmlFor="event-status-any">
                        Будь-який
                    </Form.Check.Label>
                </Form.Check>
            </Form>
        </Filters.Body.Layout>
    )
}