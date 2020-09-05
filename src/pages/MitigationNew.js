import React, {useRef, useState} from "react"
import "../style/Mitigation.css"

const MitigationNew = () => {

    const hiddenFileInput = useRef(null)
    const [fileName, setFileName] = useState("")

    function onChangeHandler(event) {
        console.log(event.target.files[0])
        setFileName(event.target.files[0].name)
    }

    function handleClick(event) {
        hiddenFileInput.current.click()
    }

    return(
        <div className='mitigation-new text-center'>
            <div className='submit-mitigation'>
                <h3> Submit your mitigation algorithm! </h3>
                <form className='form-inline justify-content-center'>
                    <input type="text" className='form-control' placeholder={fileName} readOnly/>
                    <button onClick={handleClick} className='btn btn-green'> Upload a file </button>
                </form>
                <input type="file" name="file" onChange={onChangeHandler} ref={hiddenFileInput} style={{display: 'none'}}/>
            </div>
        </div>
    )
}

export default MitigationNew