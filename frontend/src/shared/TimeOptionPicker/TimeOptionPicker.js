import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import { useRef } from "react"
const moment = require('moment')


export default function TimeOptionPicker({
    onChange,
    options = []
}){
    let selectedOption = useRef(null)

    const selectedColor = "var(--bs-success)"
    const defalutColor = "var(--bs-muted)"

    const formatDate = date => {
        return moment(date).format("HH:mm")
    }

    const handleClick = (e, option) => {
        if(selectedOption.current){
            selectedOption.current.style.setProperty("color", defalutColor, "important")
            selectedOption.current.style.setProperty("border", "none")
        }

        selectedOption.current = e.target
        selectedOption.current.style.setProperty("color", selectedColor, "important")
        selectedOption.current.style.setProperty("border-color", "var(--bs-success)", "important")

        onChange(option)
    }

    return (
        <Container className="mе-3 p-0 d-flex flex-column justify-content-center">
            <Row className="m-0 p-0 justify-content-center gap-1">
                {options.map((option, idx) =>
                    <Col
                        sm={2} xs={2}
                        key={option.id} onClick={e => handleClick(e, option)}
                        style={{backgroundColor: "var(--bs-gray-200)", cursor: "pointer", minWidth: "fit-content"}}
                        className="m-0 p-1 mt-1 text-center text-dark fs-6 rounded border time-option"
                    >
                        {formatDate(option.date)}
                    </Col>
                )}
            </Row>
        </Container>
    )
}