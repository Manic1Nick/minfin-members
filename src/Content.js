import React, { Component } from 'react'
import './Content.css'

import { createUsersObj } from './utils/UsersUtil'
import { createRatingsObj } from './utils/RatingsUtil'
import { createWinnersObj } from './utils/WinnersUtil'

class Content extends Component {
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
	  		<div className="Content">
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
		  					Object.keys(winners).map((key, i) => 		  					
		  						<p key={i} 
		  							className='rating-block' 
		  							onClick={ () => openRating(ratings[key]) }
		  						>
		  							<span className='title'>{[key]}</span>
		  							<span className='winner'>{ JSON.stringify(winners[key]) }</span>
		  						</p>		  					
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

export default Content
