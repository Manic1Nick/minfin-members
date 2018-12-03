import React, { Component } from 'react'
import './Overlay.css'

class Overlay extends Component {
  	render() {

  		const { rating, opening, close } = this.props,
  			styleOverlay = { width: opening ? '100%' : '0%' }

		return (
			<div className="Overlay" style={ styleOverlay }>
				<button className="closebtn" onClick={ () => close() }>&times;</button>

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
			</div>
	  	)
  	}
}

export default Overlay
