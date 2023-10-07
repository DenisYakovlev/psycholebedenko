import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"



export default function TestResult({restart, result}){
    const {test_name, test_max_score, score, answer, result_hash} = result

    const handleRedirect = () => {
        if(result_hash){
            window.open(`https://psycholebedenko.online/t/${result_hash}`, '_blank')
        }
    }

    return (
        <Container 
            style={{
                height: "fit-content", 
                minHeight: "100vh", 
            }} 
            className="p-0 bg-white d-flex flex-column justify-content-start" 
            fluid
        >
            <Container 
                className="px-0 py-5 d-flex flex-column justify-content-center align-items-center gap-3" 
                fluid
                style={{backgroundColor: "#f4f4f4"}}
            >
                <p style={{fontSize: "36px"}} className="m-0 p-0 text-dark fw-semibold text-center">
                    {test_name}
                </p>

                <Container className="p-0">
                    <p className="m-0 p-0 fs-5 text-muted text-center">
                        Ваш результат:
                    </p>

                    <p className="m-0 p-0 fs-3 text-dark fw-semibold text-center">
                        {`${score}/${test_max_score}`}
                    </p>
                </Container>

                {restart && (
                    <Button 
                        variant="outline-dark" 
                        className="py-3 px-5 fs-5"
                        onClick={restart}
                    >
                        Пройти ще раз
                    </Button>    
                )}
            </Container>

            <Container className="p-3" fluid="lg">
                <p className="px-0 pt-5 pb-2 m-0 text-muted fs-3 fw-semibold">
                    Пояснення результату:
                </p>

                <p 
                    className="px-0 m-0 text-dark fs-5 text-justify" 
                    style={{whiteSpace: "break-spaces"}}
                >
                    {answer.answer}
                </p>

                <p className="px-0 pt-5 pb-2 m-0 text-muted text-center fs-3 fw-semibold">
                    Постійне посилання на результат:
                </p>

                <Container className="p-0 d-flex justify-content-center">
                    <p className="px-0 m-0 text-dark text-truncate fs-5 align-self-center">
                        {`psycholebedenko.online/t/${result_hash}`}
                    </p>

                    <FontAwesomeIcon 
                        icon={faArrowUpRightFromSquare} 
                        className="ps-2 fs-5 text-dark align-self-center"
                        onClick={handleRedirect}
                        style={{cursor: "pointer"}}
                    />
                </Container>
            </Container>
        </Container>
    )
}