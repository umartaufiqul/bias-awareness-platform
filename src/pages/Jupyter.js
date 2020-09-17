import React from "react"
import '../style/Jupyter.css'
import Iframe from 'react-iframe'

const JupyterNotebook = () => {

    return(
    <div className='jupyter-notebook-div'>
        <Iframe src='http://3.34.183.118:8000' 
                className='jupyter-iframe'
        />
    </div>
    )
}

export default JupyterNotebook
