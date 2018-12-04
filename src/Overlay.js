import React, { Component } from 'react'
import { NAMES, RULES } from './constants.js'
import './Overlay.css'

class Overlay extends Component {
	renderRules() {
		return(
			<div className="overlay-content">
				<div>Правила составления рейтингов:</div>
				{
					Object.keys(NAMES).map((ratingName, i) => 
						<div className='overlay-row' key={i}>
					  		<div className='overlay-title'>{i+1}. { NAMES[ratingName] }</div>
					  		<div className='overlay-description'>{ RULES[ratingName] }</div>
					  	</div>
					)
				}
			</div>
		)
	}

	renderRating() {
		const { rating } = this.props

		return(
			<div className="overlay-content">
				<div>Топ 10 позиций рейтинга:</div>
				{
					rating.slice(0, 10).map((position, i) => 
						<div className='overlay-row' key={i}>
					  		<div className='overlay-title'>{i+1}. {position.username}</div>
					  		<div className='overlay-description'>{position.description}</div>
					  	</div>
					)
				}
			</div>
		)
	}

  	render() {
  		const { rating, opening, close } = this.props,
  			styleOverlay = { width: opening ? '100%' : '0%' }

		return (
			<div className="Overlay" style={ styleOverlay }>
				<button className="closebtn" onClick={ () => close() }>&times;</button>
			  	{
			  		rating ? this.renderRating() : this.renderRules()
			  	}
			</div>
	  	)
  	}
}

export default Overlay