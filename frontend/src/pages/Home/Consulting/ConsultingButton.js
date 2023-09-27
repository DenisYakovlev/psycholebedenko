import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";
import "./styles.css"
import { useContext } from "react";
import { UserContext } from "../../../contexts";


export default function ConsultingButton({source}){
    const {setUser} = useContext(UserContext)

    const handleExit = () => {
        localStorage.removeItem('tokens')
        setUser(null)
        alert("exited")
    }

    return (
        <Container className="m-0 pb-5 d-flex flex-column align-items-center justify-content-end gap-3 main-button-wrapper">
            <Button 
                as={Link} to={`appointment/create`}
                className="align-self-center main-button" 
                variant="outline-light p-xl-3" size="lg"
            >
                ЗАПИСАТИСЯ
            </Button>
            {/* <p onClick={handleExit} style={{fontSize: "12px"}} >
                exit
            </p> */}
        </Container>
    )
}