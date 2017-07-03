import React from 'react'

class Button extends React.Component {
  refreshTrigger() {
    console.log('triggered!')
  }

  render() {
    return (
      <div className="button-wrapper">
        <a href="#" onClick="refreshTrigger()" className="button">Refresh!</a>
      </div>
    )
  }
}

export default Button
