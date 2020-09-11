import React from "react"

const Finish = () => {
    return (
        <div className='evaluation' style={{minHeight: "90vh"}}>
            <div className='evaluation-inner text-center' style={{padding: "1rem 0rem", minHeight: "40vh"}}>
                <h3 style={{marginBottom: "2rem"}}> Form Submitted </h3>
                <p> You have finished the activity! </p>
                <p>As the platform is currently in development, feel free to leave any feedback or bug report here.</p>
            </div>
        </div>
    )
}

export default Finish