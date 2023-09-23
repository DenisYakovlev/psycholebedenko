export default function Bot(){
    var tg = window.Telegram.WebApp

    return (
        <p className="m-0 p-0 text-justify fs-6 text-dark">
            {JSON.stringify(tg.initData)}
        </p>
    )
}