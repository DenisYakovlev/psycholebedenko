import Container from "react-bootstrap/Container"
import testometrika_widget from '@testometrika/widget';
import { BaseContainer } from "../../../shared"
import { useParams } from "react-router"
import { useEffect } from "react";


export default function TestPage(){
    const {id} = useParams()

    useEffect(() => {
        testometrika_widget.Test({
            key: id,
            height_initial: "100vh",
            auto_height: false,
            loading: "lazy"
        })
    })

    return (
        <div id={id}/>
    )
}