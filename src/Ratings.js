import React, { Component } from 'react'
import RatingItem from './RatingItem'
import './Ratings.css'

import { createUsersObj } from './utils/UsersUtil'
import { createRatingsObj } from './utils/RatingsUtil'
import { createWinnersObj } from './utils/WinnersUtil'

class Ratings extends Component {
	constructor() {
		super()
		this.state = {
			users: {}, 			// { user: [ comments ] }
			ratings: {}, 		// { rating: [ all rating ] }
			winners: {} 		// { nominant: [ 1 or similars ] }
		}
  	}

  	componentDidMount() {
  		this._createDataObjects()
  	}

  	render() {
  		let { users, ratings, winners } = this.state

  		const { data, month, openRating } = this.props,
  			jsonText = JSON.stringify(data)

		return (
	  		<div className="Ratings">
				<section>
				{
		  			// array.map((comment, i) => 
		  			// 	<p key={i}>
		  			// 		{comment.toString()}
		  			// 	</p>
		  			// )
		  		}
		  		{
		  			// array.map((comment, i) => 
		  			// 	<div key={i}>
		  			// 		<span>vote: {comment.vote}</span>
		  			// 		<span>name: {comment.username}</span>
		  			// 		<span>date: {comment.date}</span>
		  			// 		<span>message: {comment.message}</span>
		  			// 	</div>
		  			// )
		  		}
		  		{
		  			users && ratings && winners ? 
		  				<div>
		  					<p>MONTH: { month }</p>
		  					<p>
		  						<span>All members: { Object.keys(users).length }</span><br />
		  						<span>All comments: { data.length }</span><br />
		  					</p>
		  				{
		  					Object.keys(winners).map((name, i) => 	
		  						<RatingItem key={i}
		  							name={ name }
		  							ratings={ ratings }
		  							winners={ winners }
		  							openRating={ openRating }
		  						/>	  					
		  					)
		  				}
		  				</div>
		  			: 'Parsing data.....'
		  		}
		  		{
		  			// jsonText
		  		}
				</section>
	  		</div>
		)
  	}

  	_createDataObjects() {
  		let users, ratings, winners

  		const { data, month } = this.props,
  			daysInMonth = new Date(2018, month, 0).getDate()

  		if (data && data.length) {
  			users = createUsersObj(data)
  			ratings = createRatingsObj(data, users, daysInMonth)
  			winners = createWinnersObj(ratings)

  			this.setState({ users, ratings, winners })
  		}
  	}
}

export default Ratings
