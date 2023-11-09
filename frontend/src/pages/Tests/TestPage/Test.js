import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"
import CloseButton from "react-bootstrap/CloseButton"
import { useContext, useRef, useState } from "react"
import TestPreview from "./TestPreview"
import Question from "./Question"
import { UserContext } from "../../../contexts"
import { BaseContainer } from "../../../shared"
import useApi from "../../../hooks/useApi"
import { useNavigate } from "react-router"


let answers = {}

export default function Test({setResult, test}){
    let navigate = useNavigate()
    let lastAnsweredIndex = useRef(0)
    const { user } = useContext(UserContext)
    const { authFetch, publicFetch } = useApi()
    const [isStarted, setIsStarted] = useState(false)
    const [index, setIndex] = useState(0)

    const testLenegth = Object.keys(test.test).length

    const nextQuestion = () => {
        const testLength = Object.values(test.test).length

        if(index == testLength - 1){
            handleResult()
        }
        else{
            // last answered should not change if current index + 1 is not next question
            lastAnsweredIndex.current = Math.max(index + 1, lastAnsweredIndex.current)
            handleSelect(index + 1)
        }
    }

    const prevQuestion = () => handleSelect(index - 1)

    const handleSelect = selectedIndex => setIndex(selectedIndex)

    const handleAnswer = (answer) => {
        // wait for 150 ms before switching to another question

        answers[answer[0]] = answer[1]
        setTimeout(resolve => nextQuestion(), 150)
    }

    const handleResult = () => {
        const score = Object.values(answers).reduce((value, curr) => curr + value, 0)

        // if user is not authorized, than use anonymous result check
        if(!user){
            publicFetch.post('psy_tests/result_anon', {
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({
                    test: test.id,
                    score: score
                })
            }).then(data => setResult(data))

            return
        }


        authFetch.post('psy_tests/result', {
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                test: test.id,
                score: score
            })
        }).then(data => setResult(data))
    }

    const handleTestClose = () => {
        navigate(-1)
    }

    return (
        <Container 
            className="p-0" 
            style={{
                minHeight: "100vh",
                height: "fit-content"
            }}
            fluid
        >
            {isStarted ? (
                <Container 
                    className="px-0 pb-5 mb-5 d-flex flex-column justify-content-center" 
                    fluid="xl"
                >
                    <Carousel
                        activeIndex={index} 
                        onSelect={handleSelect}
                        slide={false}
                        indicators={false}
                        controls={false}
                        interval={null}
                        touch={false}
                        className="m-0 p-0 w-100 h-100"
                    >
                        {Object.values(test.test).map(question => (
                            <Carousel.Item key={question.id}>
                                <Container fluid className="px-3 py-2 d-flex justify-content-between align-items-center">
                                    <p className="m-0 fs-1 text-dark fw-semibold text-truncate">
                                        {`${question.id}/${testLenegth}`}
                                    </p>

                                    <CloseButton 
                                        onClick={handleTestClose}
                                        className="fs-2 text-dark d-md-none d-block"
                                    />
                                </Container>

                                <Question 
                                    question={question}
                                    onAnswer={handleAnswer}
                                    index={index}
                                    lastAnsweredRef={lastAnsweredIndex}
                                    prevQuestion={prevQuestion}
                                    handleSelect={handleSelect}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Container>
            ) : (
                <TestPreview 
                    testObj={test}
                    start={() => setIsStarted(true)}
                />
            )}
        </Container>
    )
}