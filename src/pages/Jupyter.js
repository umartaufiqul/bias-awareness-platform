import React from "react"
import Iframe from 'react-iframe'
import '../style/Jupyter.css'

const JupyterNotebook = () => {

    return(
    <div className='jupyter-notebook-div'>
        <Iframe src='http://localhost:8888/tree/projects/20195147' 
                className='jupyter-iframe'
        />
    </div>
    )
    
    
}

export default JupyterNotebook