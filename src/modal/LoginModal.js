import { useState } from "react"

export default function LoginModal(props) {
   
    return (
        <div id="overlay" style={{display: props?.isShow === true ? '' : 'none'}}>
            <div id="popup">
                <h3>{props?.title}</h3>
                <p>{props?.detail}</p>
                <div className="button-holder one-button">
                    <a style={{ fontSize: 25 }} onClick={props.confirm}> OK </a>
                </div>

            </div>
        </div>

    )
}