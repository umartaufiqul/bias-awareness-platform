import React from "react"
import Button from "../components/Button"
import {Grid} from "semantic-ui-react"

function Introduction() {
    return(
        <div className="App">
            <h1 className="text-center"> Activity 1. Bias in Hate Speech Detection </h1>
            <p> In this activity, a member of high school board would like to have a feedback about their school facility and faculty. However, following the school policy, the board doesn't want to include feedbacks that include toxic or abusive words. On the other hand, the school board is concerned that some of the underrepresented group of student can be unnecessarily filtered out</p>
            {/* <div className="container">
            This is the example of accepatble and unacceptable comment
            <div className="comment-sample" id="c-sample1">
                <p>The school lunch is delicious, but I wish the portion could be more fulfilling</p> 
            </div>
            <div className="comment-sample" id="c-sample2">
                <p>The school lunch sucks!</p> 
            </div>
            <div className="accept-comment" id="a-comment1">
                <p> Acceptable Comment </p>
            </div>
            <div className="accept-comment" id="a-comment2">
                <p> Unacceptable Comment </p>
            </div>
            </div> */}
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column className="text-center" width={5}>
                        <p> The school lunch is delicious, but I wish the portion could be more fulfilling </p>
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column className="text-center" width={5}>
                        <p> The school lunch sucks!</p>
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <p> Acceptable comment </p>
                    </Grid.Column>
                    <Grid.Column>
                        <p> Unacceptable comment</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <p> Your task is to create a model that can automatically detect and remove such feedback, while taking the school board concern into consideration</p>
            <div className="text-center">
            <Button name="Start Activity" link='/bias-awareness-platform/#/code'/>
            </div>
        </div>
    )
}

export default Introduction