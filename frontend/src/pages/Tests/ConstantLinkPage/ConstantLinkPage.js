import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import { BaseContainer, LoadSpinner } from "../../../shared"
import { useParams } from "react-router"
import TestResult from "../TestPage/TestResult"
import ErrorPage from "./ErrorPage"
import useApi from "../../../hooks/useApi"


export default function ConstantLinkPage(){
    const { hash } = useParams()
    const {basePublicFetch} = useApi()
    const [result, setResult] = useState(null)
    const [showError, setShowError] = useState(false)

    const fetchResult = async () => {
        await basePublicFetch.get(`psy_tests/result/${hash}`)
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Hash result is not valid")
        })
        .then(data => setResult(data))
        .catch(error => setShowError(true))

    }

    useEffect(() => {
        fetchResult()
    }, [])

    if(showError){
        return <ErrorPage />
    }

    return (
        <>
            {result ? (
                <TestResult 
                    restart={null}
                    result={result}
                />
            ) : (
                <BaseContainer light/>
            )}
        </>
    )
}