import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"
const moment = require("moment")


export default function DateForm({date, onChange}){

    const getDate = () => {
        if(!date){
            return 
        }

        return moment(date).format("YYYY-MM-DD")
    }

    const handleChange = e => {
        const _date = moment(date)
        const newDate = moment(e.target.value)

        const modifiedDate = _date.clone().year(newDate.year()).month(newDate.month()).date(newDate.date())
        onChange(modifiedDate)
    }

    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Введіть Дату зустрічі
            </FormTitle>

            <Container className="px-3">
                <Form.Control
                    value={date ? getDate(date) : ""}
                    onChange={handleChange}
                    type="date"
                />
            </Container>
        </Container>
    )
}