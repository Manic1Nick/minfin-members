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

  		let monthes = this._getMonthesArray(),
  			classContent = `dropdown-content ${openingContent ? 'opening' : ''}`

		return (
			<div className='DropdownPeriod'>
				<div className='dropdown'>
					<button className='dropbtn'
						onClick={ () => this.toggleOpeningContent() }
					>Выбранный месяц: { month }</button>

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

  	_getMonthesArray() {
  		let array = []

  		for (let i = 0; i < this.props.maxMonth; i++) array.push(i+1)

  		return array
  	}
}

export default DropdownPeriod
