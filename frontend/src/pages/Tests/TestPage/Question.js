import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


export default function Question({question, onAnswer, index, prevQuestion}){
    return (
        <Container fluid className="p-0 d-flex flex-column">
            <Container className="px-3 pt-3 fs-1 text-dark fw-bold fade-in-question" fluid>
                {`${question.id}. ${question.title}`}
            </Container>

            <Form.Group className="p-3 fs-3 text-dark fw-semibold text-break d-flex flex-column fade-in-answers gap-3">
                {question.variants.map(variant => 
                    <Form.Check key={variant.id}>
                        <Form.Check.Input 
                            type="radio"
                            id={`check-${variant.id}`}
                            value={variant.value}
                            onChange={() => onAnswer([question.id, variant.weight])}
                            name={`check-group-${question.id}`}
                            style={{cursor: "pointer"}}
                        />
                        <Form.Check.Label 
                            htmlFor={`check-${variant.id}`}
                            className="w-100"
                            style={{cursor: "pointer"}}
                        >
                            {variant.value}
                        </Form.Check.Label>
                    </Form.Check>
                )}
            </Form.Group>

            {index > 0 && (
                <Container className="p-3">
                    <Button
                        variant="outline-dark"
                        size="md"
                        className="px-4"
                        onClick={prevQuestion}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="m-0 p-0"/>
                    </Button>
                </Container>
            )}
        </Container>
    )
}