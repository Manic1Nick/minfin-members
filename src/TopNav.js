import React, { Component } from 'react'
import './TopNav.css'

class TopNav extends Component {

	openRules() {
		alert('RULES')
	}

  	render() {       
		return (
			<div className="topnav">
			  	<a href="#rules" onClick={ () => this.openRules() }>Open rules</a>
			  	<input type="text" placeholder="Enter your name..." />
			</div>
		)
  	}
}

export default TopNav