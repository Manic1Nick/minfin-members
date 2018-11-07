import React, { Component } from 'react'
import './Overlay.css'

class Overlay extends Component {
  	constructor() {
		super()
		this.state = {
			content: [],
			opening: false
		}
  	}

  	componentWillReceiveProps(nextProps) {
  		if (this.props.opening !== nextProps.opening 
  				|| this.props.content !== nextProps.content) {
  			
  			this.setState({ 
  				content: nextProps.content, 
  				opening: nextProps.opening 
  			})
  		}
  	}

  	handleClose() {
  		this.setState({ 
  			content: [],
			opening: false 
		})
  	}

  	render() {

  		const { content, opening } = this.state

		return (
			<div className="Overlay" style={{ width: opening ? '100%' : '0%' }}>
			  	<a href="javascript:void(0)" 
			  		className="closebtn" 
			  		onClick={ () => this.handleClose() }
			  	>&times;</a>

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
