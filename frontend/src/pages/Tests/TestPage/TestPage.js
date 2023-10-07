import Container from "react-bootstrap/Container"
import { LoadSpinner } from "../../../shared"
import { useParams } from "react-router"
import { useContext, useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { UserContext } from "../../../contexts";
import TestResult from "./TestResult";
import Test from "./Test";
import "./style.css"


export default function TestPage(){
    const { name } = useParams()
    const { user } = useContext(UserContext)
    const { publicFetch, authFetch } = useApi()
    const [test, setTest] = useState(null)
    const [result, setResult] = useState(null)
    const [forceRestart, setForceRestart] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const fetchTest = () => {
        publicFetch.get(`psy_tests/${name}`).then(data => setTest(data))
    }

    useEffect(() => {

        // if user is not logged in than don't check his test results
        if(!user || forceRestart){
            fetchTest()
            return 
        }

        // check user last test result. In case he never completed 
        // selected test, fetch test data and let him proced.
        // If user already completed test, redirect him to test result page

        authFetch.get(`user/tests/${name}`).then(data => {
            if(data.length == 0){
                fetchTest()
            }
            else{
                setResult(data[0])
            }
        })

    }, [])

    useEffect(() => {
        if(forceRestart){
            fetchTest()
            setResult(null)
            setForceRestart(false)
        }
    }, [forceRestart])

    return (
        <>
            {result || test ? (
                result && !forceRestart  ? (
                    <TestResult 
                        restart={() => setForceRestart(true)}
                        result={result}
                    />
                ) : (
                    test ? (
                        <Test 
                            setResult={setResult}
                            test={test}
                        />
                    ) : (
                        <LoadSpinner />
                    )
                )
            ) : (
                <LoadSpinner />
            )}
        </>
    )
}