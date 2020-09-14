import React from "react"
import '../style/Jupyter.css'
import Iframe from 'react-iframe'

const JupyterNotebook = () => {

    return(
    <div className='jupyter-notebook-div'>
        <Iframe src='http://3.35.21.90:8000' 
                className='jupyter-iframe'
        />
    </div>
    )
    
    
}

export default JupyterNotebook