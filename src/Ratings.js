import React, { Component } from 'react'
import RatingItem from './RatingItem'
import DropdownPeriod from './DropdownPeriod'
import './Ratings.css'

import { createUsersObj } from './utils/UsersUtil'
import { createRatingsObj } from './utils/RatingsUtil'
import { createWinnersObj } from './utils/WinnersUtil'

class Ratings extends Component {
	// shouldComponentUpdate(nextProps) {
	// 	console.log(nextProps.month !== this.props.month)
	// 	return nextProps.month !== this.props.month
	// }

  	render() {
  		const { data, month, openRating, changePeriod } = this.props,
  			{ users, ratings, winners } = this._getDataObjects()		

		return (
	  		<div className="Ratings">
				<section>
		  		{
		  			users&& ratings && winners ? 
		  				<div>
		  					<DropdownPeriod month={ month } openPeriod={ changePeriod } />
		  					<p>
		  						<span>All members: { Object.keys(users).length }</span><br />
		  						<span>All comments: { data.length }</span><br />
		  					</p>
		  				{
		  					Object.keys(winners).map((name, i) => 	
		  						<RatingItem key={i}
		  							name={ name }
		  							rating={ ratings[name] }
		  							winner={ winners[name][0] }
		  							openRating={ openRating }
		  						/>	  					
		  					)
		  				}
		  				</div>
		  			: 'Parsing data.....'
		  		}
		  		{
		  			// jsonUsers
		  		}
				</section>
	  		</div>
		)
  	}

  	_getDataObjects() {
  		let users, ratings, winners

  		const { data, month } = this.props,
  			daysInMonth = new Date(2018, month, 0).getDate()

  		if (data && data.length) {
  			users = createUsersObj(data)
  			ratings = createRatingsObj(data, users, daysInMonth)
  			winners = createWinnersObj(ratings)
  		}
  		return { users, ratings, winners }
  	}
}

export default Ratings
