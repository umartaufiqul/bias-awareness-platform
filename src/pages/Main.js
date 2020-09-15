import React, {useState, useEffect} from "react"
import { Switch, Route } from "react-router-dom"
import {useSelector} from "react-redux"
import MyNavbar from "../components/MyNavbar"
import Visualization from "./Visualization"
import MitigationNew from "./MitigationNew"
import Finish from "./Finish"
import BiasTesting from "./BiasTesting"

const Main = () => {

    const [datasetIndex, setDatasetIndex] = useState(0)
    const loaderActive = useSelector(state => state.loaderActive)
    
    return(
    <div className='main-application'>
        {/* <Route path='/' render={(props) => <StepProgress {...props} current_step={this.state.current_step} />} /> */}
        <div className={'loader-bg '+loaderActive}>

        </div>
        <MyNavbar />
        <Switch>
            <Route path='/visualization' component={Visualization}></Route>
            <Route path='/bias-testing' component={BiasTesting}></Route>
            <Route path='/fin' component={Finish}></Route>
            <Route path='/mitigation' component={MitigationNew}></Route>
        </Switch>
    </div>
    )
    
    
}

export default Main