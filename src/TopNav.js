import React, { Component } from 'react'
import './TopNav.css'

import SearchUser from './SearchUser'

class TopNav extends Component {

  	render() {
		return (
			<div className="topnav">
			  	<a href="#rules" onClick={ () => this.props.openRules() }>Читать правила</a>
			  	<SearchUser { ...this.props } />
			</div>
		)
  	}
}

export default TopNav