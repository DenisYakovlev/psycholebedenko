import Carousel from "react-bootstrap/Carousel"
import { useState, useEffect } from "react"


export default function MonthCarousel({currYear, setCurrYear, currMonth, setCurrMonth}){
    const [index, setIndex] = useState()

    const monthes = [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
    ]

    useEffect(() => {
        setIndex(currMonth)
    }, [])

    const handleSelect = selectedIndex => {
        if(index == 11 && selectedIndex == 0){
            setCurrYear(currYear + 1)
        }
        else if(index == 0 && selectedIndex == 11){
            setCurrYear(currYear - 1)
        }

        setCurrMonth(selectedIndex)
        setIndex(selectedIndex)
    }

    return (
        <Carousel
            activeIndex={index} onSelect={handleSelect}
            className="mx-auto w-50"
            variant="dark"
            indicators={false} interval={null}
        >
            {
                monthes.map((month, idx) => 
                    <Carousel.Item key={idx} className="p-0 mb-1 text-center text-muted fs-6">
                        {month}
                    </Carousel.Item>
                )
            }
        </Carousel>
    )
}