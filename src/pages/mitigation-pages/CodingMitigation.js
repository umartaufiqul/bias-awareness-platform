import React, {useState} from "react"

const CodingMitigation = () => {
    return(
        <div className="page-box text-center">
            <h2 style={{marginBottom: "1rem"}}> Model Code </h2>
            <div>
               <button className="btn btn-green" style={{position: "absolute", right: "5rem", top: "4.5rem"}}> Go to Explanation </button>
            </div>
            {/* Placeholder for the actual jupyter notebook */}
            <div>
                JUPYTER NOTEBOOK HERE
            </div>
        </div>
    )
}

export default CodingMitigation;