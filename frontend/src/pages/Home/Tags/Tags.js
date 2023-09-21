import Container from "react-bootstrap/Container"
import TagCloud from "./TagCloud"
import { useState } from "react"
import './styles.css'


const tagText = {
    "Тривожність": "In hac habitasse platea dictumst. Ut quam ligula, luctus non elementum id, finibus eget augue. Sed imperdiet blandit orci, feugiat dignissim dolor volutpat ut. Morbi faucibus lorem sed urna venenatis porta. Curabitur non pretium turpis. Donec dignissim ligula tortor, a gravida justo pretium eu. Vestibulum pellentesque imperdiet sapien ornare tempor. In hac habitasse platea dictumst. Etiam ac auctor odio. Fusce viverra leo vitae dolor vehicula tincidunt. Donec in vulputate diam. Praesent facilisis leo eros, vitae imperdiet nulla condimentum id.",
    "Стресс": "Duis ac tellus sed metus dapibus molestie. Proin tincidunt id lorem non laoreet. Cras porttitor sollicitudin finibus. Nam ipsum eros, eleifend vel eros lacinia, commodo fermentum metus. Morbi id luctus metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel risus turpis.",
    "Дистрес": "Aenean pellentesque ante sit amet faucibus volutpat. Morbi volutpat iaculis cursus. Vivamus nec nulla urna. Nullam eu urna at ante egestas pharetra et aliquet magna. Nulla eget tempor metus, id mattis urna. Aenean pulvinar interdum massa, aliquam tempor dolor tristique nec. Duis posuere leo felis, at imperdiet ante iaculis ut. Aenean a sodales massa. In hac habitasse platea dictumst. Duis ac elit et tellus vehicula egestas ut sed nibh.",
    "Залежність": "Etiam nulla lacus, pellentesque sed ipsum id, pharetra dignissim sapien. Donec hendrerit augue vel dui volutpat consequat. Fusce rutrum, odio sed porttitor commodo, risus purus dapibus leo, vehicula dictum sapien urna a ante. Sed sed sollicitudin ante. Nulla venenatis bibendum felis, bibendum placerat erat. Ut eleifend odio pretium, blandit eros sit amet, mollis mi. In hac habitasse platea dictumst. Aenean finibus orci sit amet facilisis tincidunt. Sed dapibus, diam ac porttitor tincidunt, metus mi fermentum arcu, ac commodo sem velit eget lorem. Etiam lacinia nunc sit amet placerat consectetur. Aliquam mollis justo sit amet egestas accumsan.",
    "Самооцінка": "Donec efficitur tempor mollis. Ut vulputate odio a euismod volutpat. Integer viverra ipsum eu risus pharetra, ac ullamcorper nunc blandit. Proin sit amet diam euismod, scelerisque urna eu, rutrum est. Curabitur eget enim convallis mauris commodo euismod eu quis ligula. Nullam nibh elit, congue eget massa ut, pharetra luctus purus. Vivamus ullamcorper, ipsum et rhoncus commodo, purus mauris dignissim nisi, vel condimentum turpis nisl a massa. Curabitur vehicula nulla sed risus eleifend pellentesque.",
    "Депресія": "Phasellus in pellentesque diam. Nulla et ante ut dolor viverra ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras sed fringilla turpis, nec suscipit orci. Duis vitae luctus ex. Ut sagittis tortor pharetra consectetur congue. Integer commodo venenatis leo et ullamcorper. Fusce est tellus, elementum sed quam eu, molestie ultricies augue.",
    "Ресурс": "Duis commodo, mauris eu tincidunt placerat, erat nisi faucibus tortor, eu tempor nisi dolor quis mi. Sed nisl tortor, commodo quis lacus vel, iaculis porta nulla. Praesent quis congue libero. Vestibulum ac elementum mauris. Fusce a lacinia urna. Maecenas volutpat ex erat, vel hendrerit metus molestie sed. Praesent tempor, urna sit amet varius volutpat, mi ligula commodo enim, sit amet rhoncus diam sapien ultrices odio. Aliquam eget augue sagittis, viverra magna ac, semper velit.",
    "Відносини": "Morbi congue vehicula mauris nec porttitor. Ut nec tellus ullamcorper, fermentum ipsum vitae, porttitor nulla. Phasellus mi magna, ullamcorper in augue non, facilisis faucibus ipsum. In lobortis tincidunt facilisis. Pellentesque commodo elit sem, ac egestas odio lobortis ut. Vestibulum bibendum egestas vestibulum. Donec eu pharetra augue, sit amet tristique mauris. Phasellus quis pellentesque augue, nec tempus est. Morbi et imperdiet leo. Vestibulum convallis mi vulputate ante aliquam, et mollis velit elementum. Pellentesque pellentesque ornare libero at tristique. Ut maximus turpis efficitur iaculis pellentesque. Vivamus ac ante sed neque aliquet molestie ac sed nisi."
}

export default function Details(){
    const [activeTag, setActiveTag] = useState(null)
    
    return (
        <Container style={{backgroundColor: "#f4f4f4", height: "fit-content", minHeight: "100vh"}} className="p-0 d-flex flex-column align-items-center" fluid>
            <Container className="py-5 px-0">
                <p className="m-0 pt-5 pb-md-5 pb-3 text-center fs-1 text-dark fw-bold text-justify">
                    Текст про услуги
                </p>
            </Container>
            <Container style={{height: "25vh"}} className="p-0 d-flex flex-column align-items-center " fluid>
                <TagCloud
                    setActiveTag={setActiveTag} 
                />
            </Container>
            <Container style={{height: "fit-content", minHeight: "20vh"}} className="mt-md-5 mt-3 p-0">
                {activeTag ?
                    <p className="m-0 px-md-5 px-3 pb-5 text-muted fs-5 text-justify tagcloud-text">
                        {tagText[activeTag]}
                    </p>
                    :
                    <></>
                }
            </Container>
        </Container>    
    )
}