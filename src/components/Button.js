import React, { Component } from "react"
import "../style/Button.css"

class Button extends Component {
    goToLink = () => {
        window.location.href = this.props.link
    }

    render() {
        return (
            <div className={this.props.className}>
                <button 
                className="button"
                onClick={this.goToLink}
                >{this.props.name}</button>
            </div>
        )
    }
}

export default Button