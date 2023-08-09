import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import { useState } from "react"
import MonthCarousel from "./MonthCarousel"
const moment = require('moment')



export default function DateSelection(){
    const [currMonth, setCurrMonth] = useState(() => new Date().getMonth())
    const [currYear, setCurrYear] = useState(() => new Date().getFullYear())

    const getStartDay = () => new Date(currYear, currMonth, 1).getDay()

    const getDayInMonth = month => {
        if(month == -1){
            month = 0
        }
        return moment({currYear, month}).daysInMonth()
    }

    const countWeeks = () => {
        const startDay = getStartDay()
        const daysInMonth = getDayInMonth(currMonth)
        return Math.ceil((startDay + daysInMonth) / 7)
    } 

    return (
        <Container className="px-3 mt-3 d-flex flex-column gap-3">
            <p className="p-0 m-0 text-muted text-center fs-6">
                Оберіть доступну дату
            </p>
            
            <MonthCarousel currYear={currYear} setCurrYear={setCurrYear} currMonth={currMonth} setCurrMonth={setCurrMonth}/>

            <Table bordered={false}>
                <thead className="text-center fw-bold fs-6">
                    <tr>
                        <th>НД</th>
                        <th>ПН</th>
                        <th>ВТ</th>
                        <th>СР</th>
                        <th>ЧТ</th>
                        <th>ПТ</th>
                        <th>СБ</th>
                    </tr>
                    {[...Array(countWeeks())].map((x, i) => {
                        const startDay = getStartDay()
                        const daysInMonth = getDayInMonth(currMonth)


                        const evaluateDay = day =>{
                            const _day = day - startDay + 1
                            if(_day <= 0){
                                return getDayInMonth(currMonth - 1) + _day
                            }
                            else if(_day > daysInMonth){
                                return _day - daysInMonth
                            }
                            else{
                                return _day
                            }
                        }

                        return (
                            <tr key={i}>
                                <th>{evaluateDay(i*7 + 0)}</th>
                                <th>{evaluateDay(i*7 + 1)}</th>
                                <th>{evaluateDay(i*7 + 2)}</th>
                                <th>{evaluateDay(i*7 + 3)}</th>
                                <th>{evaluateDay(i*7 + 4)}</th>
                                <th>{evaluateDay(i*7 + 5)}</th>
                                <th>{evaluateDay(i*7 + 6)}</th>
                            </tr>
                        )
                    })}
                </thead>
            </Table>
        </Container>
    )
}