import Pagination from "react-bootstrap/Pagination"


export default function PaginationMenu({paginationObj, currentPage, setPage}){
    return (
        <Pagination className="p-3 d-flex justify-content-center gap-2" size="sm">
            <Pagination.Prev
                onClick={() => setPage(paginationObj.links.previous)} 
                disabled={!paginationObj.links.previous}
            />

            {[...paginationObj.range].map((pageNumber, idx) => {
                if(pageNumber == '...'){
                    return <Pagination.Item key={idx} onClick={() => {}}>...</Pagination.Item>
                }
                else{
                    return (
                        <Pagination.Item 
                            key={idx}
                            onClick={() => setPage(pageNumber)}
                            active={pageNumber == currentPage}
                        >
                            {pageNumber}
                        </Pagination.Item>)
                }
            })}
            
            <Pagination.Next 
                onClick={() => setPage(paginationObj.links.next)} 
                disabled={!paginationObj.links.next}
            />
        </Pagination>
    )
}