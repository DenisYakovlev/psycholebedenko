import Container from "react-bootstrap/Container"
import { AppointmentCard } from "../../../../shared"


export default function AppointmentContainer({appointment, onChange, setAppointment}){
    const handleChange = data => {
        setAppointment(data)
        onChange()
    }
    
    return (
        <>
            {appointment ?
                <Container
                    className="p-0 d-flex justify-content-center fade-in-card"
                >
                    <AppointmentCard 
                        appointment={appointment}
                        onChange={data => handleChange(data)}
                        onDelete={data => handleChange(data)}
                    />
                </Container> 
                :
                <h1></h1>
            }
        </>
    )
}