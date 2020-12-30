import React, {useRef, useState} from "react"
import "../style/Mitigation.css"
import {useDispatch, useSelector} from "react-redux"
import JupyterNotebook from "./Jupyter.js"

const MitigationNew = () => {

    const loaderActive = useSelector(state => state.loaderActive)
    return(
        <div className='mitigation-new'>
            <div className={'loader-bg '+loaderActive}>

            </div>
            <div className={'loader text-center '+loaderActive}>
                <h3> Please wait a moment </h3>
                <p style={{marginTop: "1rem"}}> Your work is currently being submitted.</p>
                <div className='spinner'></div>
            </div>

            <JupyterNotebook> </JupyterNotebook>
        </div>
    )
}

export default MitigationNew
