import Container from "react-bootstrap/Container"


const Wrapper = ({children}) => {
    return (
        <Container className="p-0 my-3 d-flex flex-column">
            {children}
        </Container>
    )
}


Wrapper.Item = ({children}) => {
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            {children}
        </Container>
    )
}


Wrapper.Title = ({children}) => {
    return (
        <p className="my-3 px-3 text-justify fs-5 text-muted">
            {children}
        </p>
    )
}

Wrapper.Body = ({children}) => {
    return (
        <Container className="px-3">
            {children}
        </Container>
    )
}


export default Wrapper