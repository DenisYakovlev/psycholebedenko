import Container from "react-bootstrap/Container"


export default function BasePageLayout({children}){
    return (
        <Container 
            style={{
                minHeight: "100vh", 
                height: "fit-content", 
                backgroundColor: "var(--bs-gray-100)"
            }} 
            className="p-0" 
            fluid
        >
            {children}
        </Container>
    )
}