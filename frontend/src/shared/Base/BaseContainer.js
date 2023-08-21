import Container from "react-bootstrap/Container"


export default function BaseContainer({
    light=false, 
    className="", 
    style={}, 
    children, 
    props
}){ 
    return (
        <Container
            className={
                `m-0 p-0 py-5 d-flex flex-column justify-content-start align-items-center ${className}`
            }
            style={{
                minHeight: "100vh",
                height: "fit-content",
                backgroundColor: light ? "#f4f4f4" : "white",
                ...style
            }}
            fluid
            {...props}
        >
            {children}
        </Container>
    )
}