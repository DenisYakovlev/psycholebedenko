import Container from "react-bootstrap/Container"
const moment = require('moment');


export default function DateOptionSelector({options, setDate, nextSlide}){
    const formatDate = date => {
        return moment(date).format("HH:mm")
    }

    const handleClick = (e, option) => {
        setDate(option.id)
        nextSlide()
    }

    return (
        <Container className="m-0 p-0 mb-5 d-flex flex-column justify-content-center align-items-center">
            <p className="p-0 m-0 text-muted text-center fs-6">
                Оберіть годину
            </p>


            {options.map((option, idx) =>
                <p 
                    key={idx} onClick={e => handleClick(e, option)}
                    className="m-0 p-1 mt-3 text-center 
                    fs-6 text-muted border-bottom border-secondary"
                >
                    {formatDate(option.date)}
                </p>
            )}
        </Container>
    )
}