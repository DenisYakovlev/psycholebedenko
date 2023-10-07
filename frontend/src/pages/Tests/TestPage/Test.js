import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"
import { useContext, useRef, useState } from "react"
import TestPreview from "./TestPreview"
import Question from "./Question"
import { UserContext } from "../../../contexts"
import { BaseContainer } from "../../../shared"
import useApi from "../../../hooks/useApi"

let answers = {}

export default function Test({setResult, test}){
    const { user } = useContext(UserContext)
    const { authFetch } = useApi()
    const [isStarted, setIsStarted] = useState(false)
    const [index, setIndex] = useState(0)

    const testLenegth = Object.keys(test.test).length

    const nextQuestion = () => {
        const testLength = Object.values(test.test).length

        if(index == testLength - 1){
            handleResult()
        }
        else{
            handleSelect(index + 1)
        }
    }

    const prevQuestion = () => handleSelect(index - 1)

    const handleSelect = selectedIndex => setIndex(selectedIndex)

    const handleAnswer = (answer) => {
        answers[answer[0]] = answer[1]
        setTimeout(resolve => nextQuestion(), 150)
    }

    const handleResult = () => {
        const score = Object.values(answers).reduce((value, curr) => curr + value, 0)


        if(!user){
            setResult({
                test: test.id,
                test_name: test.name,
                score: score
            })
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

    return (
        <BaseContainer >
            {isStarted ? (
                <Container 
                    className="px-0 d-flex flex-column justify-content-center" 
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
                                <p className="p-0 pb-3 m-0 fs-1 text-dark fw-semibold text-truncate">
                                    {`${question.id}/${testLenegth}`}
                                </p>

                                <Question 
                                    question={question}
                                    onAnswer={handleAnswer}
                                    index={index}
                                    prevQuestion={prevQuestion}
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
        </BaseContainer>
    )
}