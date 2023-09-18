import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import { Helmet } from "react-helmet"
import { LoadSpinner } from "../../../shared"
import { backend_url } from "../../../constants"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts"
import CardHeader from "./CardHeader"
import { useNavigate } from "react-router-dom";
import CardBody from "./CardBody"
import "../styles.css"
import useApi from "../../../hooks/useApi"


const styles = {
    card: {
        maxWidth: "100vw",
        minWidth: "350px",
        width: "500px",
        minHeight: "80vh",
        height: "fit-content",
    }
}

export default function User(){
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const {authFetch} = useApi()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchUser = async () => {
        setIsLoading(true)

        await authFetch.get('user/me').then(data => setUserData(data))


        setIsLoading(false)
    }

    // useEffect(() => {
    //     if(!user){
    //         navigate("/")
    //         return
    //     }
    // }, [])

    useEffect(() => {
        if(!user){
            navigate("/")
            return
        }

        fetchUser()
    }, [user])

    if(isLoading){
        return <LoadSpinner />
    }

    return (
        <Container 
            style={{backgroundColor: "#f4f4f4", height: "fit-content", minHeight: "100vh"}} 
            className="p-0 m-0 d-flex justify-content-center align-items-start" fluid
        >
            <Helmet>
                <title>Особиста сторінка</title>
            </Helmet>
            
            <Card 
                style={styles.card} bg="light" data-bs-theme="light" 
                className= 
                    "h-100 mt-sm-5 mb-5 p-0 shadow border-0 \
                    d-flex flex-column justify-content-start gap-3 fade-in-card"
            >
                <CardHeader user={userData}/>
                <CardBody user={userData}/>
            </Card>
        </Container>
    )
}