import Container from "react-bootstrap/Container"
import { useEffect, useRef } from "react"


export default function TagCloud({setActiveTag}){
    let activeTagRef = useRef(null)
    let activeTagRandomChoose = useRef(true)


    useEffect(() => {
        const el = document.getElementsByClassName("tagcloud-active")[0]
        activeTagRef.current = el

        setActiveTag(activeTagRef.current.innerHTML)
    }, [])

    
    useEffect(() => {
        let _interval = setInterval(() => {
            if(activeTagRandomChoose.current == false){
                return () => clearInterval(_interval)
            }

            activeTagRef.current.classList.remove('tagcloud-active')
            activeTagRef.current.classList.toggle('tagcloud-idle')

            const tags = document.getElementsByClassName('tagcloud-idle')
            const randomInt = Math.floor(Math.random() * tags.length)

            activeTagRef.current = tags[randomInt]
            setActiveTag(activeTagRef.current.innerHTML)

            activeTagRef.current.classList.remove('tagcloud-idle')
            activeTagRef.current.classList.toggle('tagcloud-active')
        }, 3000)

        return () => clearInterval(_interval)
    })

    const handleActiveChange = e => {
        activeTagRandomChoose.current = false

        activeTagRef.current.classList.remove('tagcloud-active')
        activeTagRef.current.classList.toggle('tagcloud-idle')

        activeTagRef.current = e.target
        setActiveTag(activeTagRef.current.innerHTML)
        activeTagRef.current.classList.remove('tagcloud-idle')
        activeTagRef.current.classList.toggle('tagcloud-active')
    }

    return (
        <Container className="p-0 position-relative d-flex justify-content-center" fluid>
            <Container style={{height: "25vh", maxWidth: "100vw", width: "1100px", minWidth: "350px"}} className="p-0 position-absolute top-0 left-0 overflow-hidden" fluid>
                <p onClick={handleActiveChange} className="m-0 p-0 tagcloud-idle" style={{top: "10%", left: "35%", cursor: "pointer"}}>
                    Тривожність
                </p>
                <p onClick={handleActiveChange} className="m-0 p-0 tagcloud-idle" style={{top: "20%", left: "15%", cursor: "pointer"}}>
                    Стресс
                </p>
                <p onClick={handleActiveChange} className="m-0 p-0 tagcloud-idle" style={{top: "52%", left: "45%", cursor: "pointer"}}>
                    Дистрес
                </p>
                <p onClick={handleActiveChange} className="m-0 p-0 tagcloud-active" style={{top: "30%", left: "51%", cursor: "pointer"}}>
                    Залежність
                </p>
                <p onClick={handleActiveChange} className="m-0 p-0 tagcloud-idle" style={{top: "45%", left: "10%", cursor: "pointer"}}>
                    Самооцінка
                </p>
                <p onClick={handleActiveChange} className="m-0 p-0 tagcloud-idle" style={{top: "47%", left: "68%", cursor: "pointer"}}>
                    Депресія
                </p>
                <p onClick={handleActiveChange} className="m-0 p-0 tagcloud-idle" style={{top: "35%", left: "32%", cursor: "pointer"}}>
                    Паніка
                </p>
                <p onClick={handleActiveChange} className="m-0 p-0 tagcloud-idle" style={{top: "17%", left: "65%", cursor: "pointer"}}>
                    Відносини
                </p>
            </Container>
        </Container>
    )
}