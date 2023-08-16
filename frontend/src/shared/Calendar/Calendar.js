import Container from "react-bootstrap/Container"
import MonthCarousel from "./MonthCarousel"
import CalendarHeader from "./CalendarHeader"
import CalendarBody from "./CalendarBody"
import Table from "react-bootstrap/Table"
import { useState } from "react"
import "./styles.css"


export default function Calendar({
    onChange, 
    format = null
}){
    const [currMonth, setCurrMonth] = useState(() => new Date().getMonth())
    const [currYear, setCurrYear] = useState(() => new Date().getFullYear())

    const defaultFormat = date =>  date.month == currMonth

    return (
        <Container className="m-0 p-0 d-flex flex-column gap-1">
            <MonthCarousel 
                currYear={currYear} setCurrYear={setCurrYear} 
                currMonth={currMonth} setCurrMonth={setCurrMonth}
            />
            
            <Table className="text-center fs-6 shadow-sm" bordered={false}>
                <CalendarHeader />
                <CalendarBody
                    onChange={onChange}
                    format={format ?? defaultFormat}
                    currMonth={currMonth} currYear={currYear}
                />
            </Table>
        </Container>
    )
}
