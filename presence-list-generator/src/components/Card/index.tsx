import './style.css';

export type CardAtt = {
    name?: string,
    time?: string
}

export function Card(props: CardAtt) {
    return(
        <div className="card">
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    )
}