import React, { Component } from 'react'
import './SearchUser.css'

class SearchUser extends Component {

	constructor() {
		super()
		this.state = {
			filter: ''
		}
	}

	handleFilter(event) {
		let filter = event.target ? event.target.value.toLowerCase() : event      
        this.setState({ filter })
	}

	handleClearFilter() {
		this.setState({ filter: '' })
	}

	handleOpenUser(username) {
		this.props.openUser(username)
		this.handleClearFilter()
	}

  	render() {       
  		const { filter } = this.state,
  			{ usernames, openUser } = this.props

  		let visibleUsernames = usernames.filter(username => username.toLowerCase().includes(filter)),
  			classContent = `dropdown-content ${filter.length ? 'opening' : ''}`

		return (
			<div className='SearchUser'>
				<div className='dropdown'>
					<input type="text" ref='input' 
						placeholder="Enter your name..." 
						value={ filter } 
						onChange={ this.handleFilter.bind(this) }
					/>

					<ul className={ classContent }>
					{
						visibleUsernames.map((username, i) => 
							<li key={i} onClick={ () => this.handleOpenUser(username) }>{ username }</li>
						)
					}
					</ul>
				</div>
			</div>
		)
  	}
}

export default SearchUser