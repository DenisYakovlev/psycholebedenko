import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"


export default function SearchBar({value, onChange, onSubmit}){
    const handleKeyDown = event => {
        if(event.key == "Enter"){
            onSubmit()
        }
    }

    return (
        <InputGroup className="m-0 p-5">
            <Form.Control
                value={value}
                onChange={e => onChange(e.target.value)}
                className="border-secondary" 
                onKeyDown={handleKeyDown}
                type="search"
                placeholder="Введіть номер телефона або юзернейм"
            />
            <InputGroup.Text 
                style={{cursor: "pointer"}}
                onClick={onSubmit}
                className="bg-white border-secondary"
            >
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </InputGroup.Text>
        </InputGroup>
    )
}