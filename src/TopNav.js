import React, { Component } from 'react'
import './TopNav.css'

import SearchUser from './SearchUser'

class TopNav extends Component {

	openRules() {
		alert('RULES')
	}

  	render() {
  		const { usernames, ratings, openUser } = this.props

		return (
			<div className="topnav">
			  	<a href="#rules" onClick={ () => this.openRules() }>Open rules</a>
			  	<SearchUser usernames={ usernames } ratings={ ratings }  openUser={ openUser } />
			</div>
		)
  	}
}

export default TopNav