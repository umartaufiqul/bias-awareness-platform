import React, {useState} from "react"
import Iframe from 'react-iframe'

const CodingMitigation = () => {
    return(
        <div className="page-box text-center">
            <h2 style={{marginBottom: "1rem"}}> Model Code </h2>
            <div>
               <button className="btn btn-green" style={{position: "absolute", right: "5rem", top: "4.5rem"}}> Go to Explanation </button>
            </div>
            {/* Placeholder for the actual jupyter notebook */}
            <div>
            <Iframe src=' http://127.0.0.1:8888/?token=33cfb6ffb5f814ef447410c941a086d9979a65e9fac488ce' 
                className='jupyter-iframe'
            />
            </div>
        </div>
    )
}

export default CodingMitigation;