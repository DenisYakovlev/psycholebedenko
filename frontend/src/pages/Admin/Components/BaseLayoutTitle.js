export default function BaseLayoutTitle({children}){
    return (
        <p 
            style={{borderBottom: "solid 2px var(--bs-gray-400)"}}
            className="py-3 px-0 m-0 text-center text-muted fs-4 fw-semibold"
        >
            {children}
        </p>
    )
}