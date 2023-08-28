import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


export default function SearchBar({value, onChange, onSubmit}){
    const [searchValue, setSearchValue] = useState(value) 

    const handleKeyDown = event => {
        if(event.key == "Enter"){
            onSubmit(searchValue)
        }
    }

    return (
        <InputGroup className="m-0 p-5">
            <Form.Control
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                className="border-secondary" 
                onKeyDown={handleKeyDown}
                type="search"
                placeholder="Введіть номер тел./юзернейм"
            />
            <InputGroup.Text 
                style={{cursor: "pointer"}}
                onClick={() => onSubmit(searchValue)}
                className="bg-white border-secondary"
            >
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </InputGroup.Text>
        </InputGroup>
    )
}