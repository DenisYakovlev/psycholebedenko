import Form from "react-bootstrap/Form"


export default function ZoomForm({createZoomLink, setCreateZoomLink}){
    return (
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
                <Form.Check.Label htmlFor="create-zoom-form-yes">
                    Так
                </Form.Check.Label>
            </Form.Check>
            <Form.Check>
                <Form.Check.Input 
                    value={false} 
                    onChange={e => setCreateZoomLink(e.target.value)}  
                    name="create-zoom-form"
                    type="radio" 
                    id="create-zoom-form-no"
                />
                <Form.Check.Label htmlFor="create-zoom-form-no">
                    Ні
                </Form.Check.Label>
            </Form.Check>
        </Form>
    )
}