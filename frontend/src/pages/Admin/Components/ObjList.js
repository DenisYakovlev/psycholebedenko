import { useRef } from "react"
import { PaginationMenu } from "../../../shared"
import Container from "react-bootstrap/Container"


export default function ObjList({obj, ObjComponent, setSelectedObj, page, setPage}){
    let selectedObjRef = useRef(null)

    const handleSelect = (objEntity, componentRef) => {
        if(selectedObjRef.current){
            selectedObjRef.current.style.setProperty("border-right", "none", "important")
        }

        selectedObjRef.current = componentRef
        selectedObjRef.current.style.setProperty("border-right", "solid 5px #556080", "important")
        
        setSelectedObj(objEntity)
    }

    return (
        obj && (
            <Container className="p-0">
                {Object.values(obj.results).map(objEntity =>
                    <ObjComponent 
                        key={objEntity.id} 
                        value={objEntity} 
                        onSelect={(objEntity, componentRef) => handleSelect(objEntity, componentRef)}
                    />
                )}

                <PaginationMenu 
                    paginationObj={obj}
                    currentPage={page}
                    setPage={setPage}
                />
            </Container>
        )
    )
}