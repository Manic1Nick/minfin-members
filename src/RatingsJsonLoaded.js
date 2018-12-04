import React, { Component } from 'react'
import './Ratings.css'

class RatingsJsonLoaded extends Component {
  	render() {
  		const { data } = this.props,
  			jsonData = JSON.stringify(data)

		return (
	  		<div className="Ratings">
				<section>
		  		{
		  			jsonData
		  		}
				</section>
	  		</div>
		)
  	}
}

export default RatingsJsonLoaded
