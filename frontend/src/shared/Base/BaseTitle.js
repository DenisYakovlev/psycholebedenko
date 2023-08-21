import Container from "react-bootstrap/Container";

export default function BaseTitle({
    className = "",
    style={},
    children, 
    props
}){

    return (
        <Container 
            className={
                `m-0 p-0 d-flex flex-column gap-3 align-items-center justify-content-end text-center fs-1 fw-semibold text-dark ${className}` 
            }
            style={{
                height: "10vh",
                ...style
            }}
            fluid
            {...props}
        >
            {children}
        </Container>
    )
}