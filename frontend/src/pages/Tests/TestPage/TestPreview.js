import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"


export default function TestPreview({testObj, start}){
    const {id, name, img_url, description, test} = testObj

    return (
        <Container 
            fluid="xl" 
            className="px-0 py-5 d-flex flex-column justify-content-center align-items-center gap-3"
        >
            <Image 
                src={img_url} 
                width={160} 
                height={160}
                alt="test description"
            />

            <p 
                style={{fontSize: "36px"}} 
                className="m-0 p-0 text-dark text-center fw-semibold"
            >
                {name}
            </p>

            <Button 
                variant="outline-dark" 
                size="lg" 
                className="px-5 py-3 fs-4"
                onClick={start}
            >
                Пройти тест
            </Button>

            <p 
                className="py-5 px-3 m-0 text-muted fs-5 text-justify" 
                style={{whiteSpace: "break-spaces"}}
            >
                {description}
            </p>
        </Container>
    )
}