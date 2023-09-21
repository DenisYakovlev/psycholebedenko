import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TagCloud from "./TagCloud"
import { useState } from "react"
import './styles.css'


const styles = {
    hr: {
        width: "120px",
        height: "2px",
        backgroundColor: "#556080",
        border: "none",
        opacity: "1"
    }
}

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
        <Container className="p-0 bg-white d-flex flex-column align-items-center" fluid>
            <Container className="pt-5 pb-md-3 pb-3 px-0">
                <p className="m-0 pt-md-5 pt-3 pb-3 text-center fs-1 text-dark fw-bold text-justify">
                    Текст про услуги
                </p>
            </Container>
            <Container style={{height: "25vh"}} className="p-0 d-flex flex-column align-items-center " fluid>
                <TagCloud
                    setActiveTag={setActiveTag} 
                />
            </Container>
            <Container style={{height: "fit-content", minHeight: "20vh"}} className="mt-md-5 mt-3 p-0">
                <p className="m-0 px-md-5 px-3 text-muted fs-5 text-justify">
                    {activeTag ? tagText[activeTag] : "none"}
                </p>
            </Container>
        </Container>    
    )
}

// export default function Details(){
//     return (
//         <Container style={{backgroundColor: "#f4f4f4"}} className="m-0 p-0" fluid>
//             <Row lg={4} sm={2} xs={1} style={{height: "fit-content", maxWidth: "1200px"}} className="m-0 py-5 mx-lg-auto">
//                 <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column g-3">
//                     <h2 className="text-dark text-justify">
//                         Досвід
//                     </h2>
//                     <hr style={styles.hr} className="m-0 mb-3"/>
//                     <p className="text-muted text-justify">
//                         Групові психологічні зустрічі.
//                         Індивидуальні психологічні консультаціїї. 
//                         Загальний досвід роботи: 3 роки. 
//                     </p>
//                 </Col>
//                 <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column g-3">
//                     <h2 style={styles.header} className="text-dark text-justify">
//                         Освіта
//                     </h2>
//                     <hr style={styles.hr} className="m-0 mb-3"/>
//                     <p className="text-muted text-justify">
//                         Вища освіта по спеціальності психологія. <br />
//                         ЧНУ ім. Петра Могили.
//                     </p>
//                 </Col>
//                 <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column g-3">
//                     <h2 style={styles.header} className="text-dark text-justify">
//                         Напрям 
//                     </h2>
//                     <hr style={styles.hr} className="m-0 mb-3"/>
//                     <p className="text-muted text-justify">
//                         Інтегративний підхід. <br />
//                         Когнітивно-поведінкова терапія з елементами арт-терапії.
//                     </p>
//                 </Col> 
//                 <Col className="m-0 p-0 ps-5 pe-sm-3 pe-5 my-lg-0 my-3 d-flex flex-column g-3">
//                     <h2 style={styles.header} className="text-dark text-justify">
//                         Запити
//                     </h2>
//                     <hr style={styles.hr} className="m-0 mb-3"/>
//                     <p className="text-muted text-justify">
//                         Підвищена тривожність, 
//                         надмірна емоційність, 
//                         негативні переживання які впливають на психічне та фізичне здоров'я
//                     </p>
//                 </Col>
//             </Row>
//         </Container>
//     )
// }