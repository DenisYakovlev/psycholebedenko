import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import Image from "react-bootstrap/Image"


export default function CardHeader({user}){
    return (
        <Container 
            className="mt-5 p-0 \
            d-flex flex-column justify-content-start align-items-center gap-3" fluid
        >
            <Image src={user?.photo_url} width="30%" height="30%" roundedCircle />
            
            <Container className="m-0 p-0 d-flex flex-column align-items-center">
                <p className="m-0 p-0 text-center text-dark fw-bold fs-3">
                    {`${user?.first_name ?? ""}  ${user?.last_name ?? ""}`}
                </p>
                {user?.username &&
                    <p className="m-0 p-0 text-center text-muted fs-6">
                        {`@${user.username ?? ""}`}
                    </p>
                }
            </Container>

            {user?.is_staff &&
                <Container className="m-0 p-0 d-flex justify-content-center">
                    <Button as={Link} to="/admin" variant="outline-dark" size="lg">
                        АДМІНСЬКА ПАНЕЛЬ
                    </Button>
                </Container>
            }
        </Container>
    )
}