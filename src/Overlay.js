import React, { Component } from 'react'
import './Overlay.css'

class Overlay extends Component {
  	render() {

  		const { content, opening, close } = this.props

		return (
			<div className="Overlay" style={{ width: opening ? '100%' : '0%' }}>
			  	<button className="closebtn" onClick={ () => close() }>&times;</button>

			  	<div className="overlay-content">
			  	Топ 10 позиций рейтинга:
			  	{
			  		content.slice(0, 10).map((rate, i) => 
			  			<p key={i}>{i+1}. {rate.username}, score: {rate.scores}</p>
			  		)
			  	}
			  	</div>
			</div>
	  	)
  	}
}

export default Overlay
