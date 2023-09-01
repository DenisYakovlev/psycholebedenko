import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import { Filters } from "../../Components"


export default function DateFilters({outdated, setOutdated}){
    return (
        <Filters.Body.Layout>
            <Filters.Body.Title>
                Показувати минулі консультації?
            </Filters.Body.Title>

            <Form className="px-5">
                <Form.Check >
                    <Form.Check.Input 
                        value={true}
                        defaultChecked={outdated == null ? false : outdated} 
                        onChange={() => setOutdated(true)}  
                        name="outdated-group" 
                        type="radio" 
                        id="state-outdated-true"
                    />
                    <Form.Check.Label htmlFor="state-outdated-true">Так</Form.Check.Label>
                </Form.Check>

                <Form.Check>
                    <Form.Check.Input 
                        value={false} 
                        defaultChecked={outdated == null ? false : !outdated}
                        onChange={() => setOutdated(false)}  
                        name="outdated-group" 
                        type="radio" 
                        id="state-outdated-false"
                    />
                    <Form.Check.Label htmlFor="state-outdated-false">Ні</Form.Check.Label>
                </Form.Check>
            </Form>
        </Filters.Body.Layout>
    )
}