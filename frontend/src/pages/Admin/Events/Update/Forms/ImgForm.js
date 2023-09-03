import Form from "react-bootstrap/Form"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import FormTitle from "./FormTitle"
import { backend_url } from "../../../../../constants"
import { useEffect, useState } from "react"


export default function ImgForm({imgURL, onChange}){
    const [imgList, setImgList] = useState([])

    useEffect(() => {
        fetch(`${backend_url}/event/images`, {
            method: "GET"
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error("Admin event image fetch error")
        })
        .then(data => setImgList(data))
        .catch(error => console.log(error))
    }, [])
    
    return (
        <Container className="p-0 pb-4 border-bottom border-muted" fluid>
            <FormTitle>
                Виберіть фото
            </FormTitle>

            <Container className="p-0 d-flex flex-column gap-3">
            {imgList.map((img, idx) => 
                <Form.Check key={idx} className="px-3 d-flex flex-row gap-3 align-items-center">
                    <Form.Check.Input
                        className="border-dark"
                        value={img}
                        onClick={onChange}
                        defaultChecked={imgURL == img}
                        name="admin-event-update-img"
                        type="radio"
                        id={`admin-event-update-img-${idx}`}
                    />
                    <Image src={img} width="80%" height="80%"/>
                </Form.Check>
            )}
            </Container>
        </Container>
    )
}

// as={Image} src={img} width="50px" height="50px"