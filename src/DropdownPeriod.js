import React, { Component } from 'react'
import './DropdownPeriod.css'

class DropdownPeriod extends Component {
	constructor() {
		super()
		this.state = {
			openingContent: false
		}
  	}

  	toggleOpeningContent() {
  		let { openingContent } = this.state
  		this.setState({ openingContent: !openingContent })
  	}

  	handleOpenPeriod(month) {
  		this.toggleOpeningContent()
  		this.props.openPeriod(month)
  	}

  	render() {
  		const { month } = this.props,
  			{ openingContent } = this.state

  		let monthes = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
  			classContent = `dropdown-content ${openingContent ? 'opening' : ''}`

		return (
			<div className='DropdownPeriod'>
				<div className='dropdown'>
					<button className='dropbtn'
						onClick={ () => this.toggleOpeningContent() }
					>Current month: { month }</button>

					<ul className={ classContent }>
					{
						monthes.map((month, i) => 
							<li key={i} onClick={ () => this.handleOpenPeriod(month) } >{ month }</li>
						)
					}
					</ul>
				</div>
			</div>
	  		
		)
  	}
}

export default DropdownPeriod
