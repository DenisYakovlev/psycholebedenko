import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"
const moment = require("moment")


export default function TimeForm({date, onChange}){

    const getTime = () => {
        if(!date){
            return 
        }

        return moment(date).format("HH:mm")
    }

    const handleChange = e => {
        const _date = moment(date)
        const [hour, minute] = e.target.value.split(":")

        const modifiedDate = _date.clone().hour(hour).minute(minute)
        onChange(modifiedDate)
    }

    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Введіть Час зустрічі
            </FormTitle>

            <Container className="px-3">
                <Form.Control
                    value={getTime(date)}
                    onChange={handleChange}
                    type="time"
                />
            </Container>
        </Container>
    )
}