import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import { Filters } from "../../Components"


export default function StatusFilter({statusList, setStatusList}){
    const handleChange = e => {
        const value = e.target.value

        //handle add and delete to array
        if([...statusList].includes(value)){
            const newStatusList = [...statusList].filter(status => status != value)
            setStatusList([...newStatusList])
        }
        else{
            setStatusList([...statusList, value])
        }
    }

    return (
        <Filters.Body.Layout>
            <Filters.Body.Title>
                Виберіть статуси для пошуку
            </Filters.Body.Title>

            <Form className="px-5">
                <Form.Check >
                    <Form.Check.Input 
                        value="pending" 
                        defaultChecked={[...statusList].includes("pending")}
                        onChange={e => handleChange(e)}  
                        type="checkbox" 
                        id="admin-status-pending"
                    />
                    <Form.Check.Label htmlFor="admin-status-pending">в обробці</Form.Check.Label>
                </Form.Check>

                <Form.Check>
                    <Form.Check.Input 
                        value="appointed" 
                        defaultChecked={[...statusList].includes("appointed")}
                        onChange={e => handleChange(e)}  
                        type="checkbox" 
                        id="admin-status-appointed"
                    />
                    <Form.Check.Label htmlFor="admin-status-appointed">назначено</Form.Check.Label>
                </Form.Check>

                <Form.Check>
                    <Form.Check.Input 
                        value="complete" 
                        defaultChecked={[...statusList].includes("complete")}
                        onChange={e => handleChange(e)}
                        type="checkbox" 
                        id="admin-status-complete"
                    />
                    <Form.Check.Label htmlFor="admin-status-complete">виконано</Form.Check.Label>
                </Form.Check>

                <Form.Check>
                    <Form.Check.Input 
                        value="denied" 
                        defaultChecked={[...statusList].includes("denied")}
                        onChange={e => handleChange(e)}  
                        type="checkbox" 
                        id="admin-status-denied"
                    />
                    <Form.Check.Label htmlFor="admin-status-denied">відмінено</Form.Check.Label>
                </Form.Check>
            </Form>
        </Filters.Body.Layout>
    )
}