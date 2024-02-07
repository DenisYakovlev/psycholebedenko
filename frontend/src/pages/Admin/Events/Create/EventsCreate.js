import { BasePageLayout, TwoSideLayout } from "../../Components"
import LayoutSide from "./LayoutSide"
import LayoutMain from "./LayoutMain"
import ContinueModal from './ContinueModal'
import { useState, useEffect } from "react"


export default function EventsCreate(){
    const [virtualEvent, setVirtualEvent] = useState({})
    const [showContinueModal, setShowContinueModal] = useState(false)

    useEffect(() => {
        window.scroll(0, 0)

        try{
            const savedData = JSON.parse(localStorage.getItem('adminEventCreateForm'))
            if(Object.keys(savedData).length > 0){
                setShowContinueModal(true)
            }
        }
        catch{

        }
    }, [])

    const retrieveFormData = () => {
        const savedData = JSON.parse(localStorage.getItem('adminEventCreateForm'))
        console.log(savedData)
        setVirtualEvent(savedData)
    }
    
    useEffect(() => {
        const formIsNotEmpty = 
                Object.values(virtualEvent).some(value => value !== undefined)
                
        const handleBeforeUnload = event => {
            if(formIsNotEmpty){
                event.preventDefault()
                const message = 'Are you sure?'
                event.returnValue = message

                return message
            }
        }
        
        window.addEventListener('beforeunload', handleBeforeUnload)
        
        return () =>{
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [virtualEvent])

    useEffect(() => {
        const formData = JSON.parse(localStorage.getItem('adminEventCreateForm'))
        localStorage.setItem('adminEventCreateForm', JSON.stringify({...formData, ...virtualEvent}))
    }, [virtualEvent])

    return (
        <BasePageLayout>
            <TwoSideLayout>
                <ContinueModal 
                    show={showContinueModal}
                    hide={() => setShowContinueModal(false)}
                    onAccept={() => retrieveFormData()}
                    onDecline={() => localStorage.setItem('adminEventCreateForm', '{}')}
                />

                <TwoSideLayout.Side>
                    <LayoutSide 
                        event={virtualEvent}
                        setEvent={setVirtualEvent}
                    />
                </TwoSideLayout.Side>

                <TwoSideLayout.Main sticky>
                    <LayoutMain
                        event={virtualEvent}
                    />
                </TwoSideLayout.Main>
            </TwoSideLayout>
        </BasePageLayout>
    )
}