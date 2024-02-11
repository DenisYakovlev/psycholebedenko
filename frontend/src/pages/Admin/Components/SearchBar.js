import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"


export default function SearchBar({value, onChange, onSubmit, placeholder=""}){
    const [searchValue, setSearchValue] = useState(value) 

    const handleKeyDown = event => {
        if(event.key == "Enter"){
            onSubmit(searchValue)
        }
    }

    const handleChange = event => {
        const data = event.target.value

        setSearchValue(data)
        onChange(data)
    }

    return (
        <InputGroup className="m-0 px-5 py-3">
            <Form.Control
                value={searchValue ? searchValue : ""}
                onChange={e => handleChange(e)}
                className="border-secondary" 
                onKeyDown={handleKeyDown}
                type="search"
                placeholder={placeholder}
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