import DatePicking from "../../../../Appointment/create/DatePicking";
import Card from "react-bootstrap/Card"
import { formatDate } from "../../../../utils";


export default function DateForm({date, setDate}){
    console.log(date)

    return (
        <>
            <DatePicking sumbitDate={setDate}/>

            {date ? 
                <Card.Text className="p-0 mt-3 text-dark fs-6 text-justify">
                    {`Обрана дата: ${formatDate(date.date)}`}
                </Card.Text>
                :
                <></>
            }
        </>
    )
}