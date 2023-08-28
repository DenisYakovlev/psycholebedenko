import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"


export default function DateFilters({outdated, setOutdated}){
    return (
        <Container className="p-0 py-3" fluid>
            <p className="m-0 px-3 pb-3 text-muted text-justify fs-5">
                Показувати минулі консультації?
            </p>

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
        </Container>
    )
}