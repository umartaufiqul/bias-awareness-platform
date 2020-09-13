import React from "react"
import Iframe from 'react-iframe'
import '../style/Jupyter.css'

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