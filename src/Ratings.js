import React, { Component } from 'react'
import RatingItem from './RatingItem'
import DropdownPeriod from './DropdownPeriod'
import './Ratings.css'

// import { createUsersObj } from './utils/UsersUtil'
// import { createRatingsObj } from './utils/RatingsUtil'
// import { createWinnersObj } from './utils/WinnersUtil'

class Ratings extends Component {
	renderSelectedUserButton() {
		const { data, openUser } = this.props

		if (!data.selectedRatings) return null

		return(
			<div className='selected-user'>
				Отобрано по: 
				<div className='selected-user-btn'>
					{ data.selectedRatings.username } 
					<button className="closebtn" onClick={ () => openUser('') }>&times;</button>
				</div>
		  	</div>
		)
	}

  	render() {
  		const { data, month, openRating, changePeriod } = this.props,
  			{ users, ratings, winners, selectedRatings } = data

		return (
	  		<div className="Ratings">
				<section>
		  		{
		  			users && ratings && winners ? 
		  				<div>
		  					<DropdownPeriod month={ month } openPeriod={ changePeriod } />
		  					{ 
		  						this.renderSelectedUserButton() 
		  					}
		  					<p>
		  						<span>All members: { Object.keys(users).length }</span><br />
		  						<span>All comments: { data.length }</span><br />
		  					</p>
		  				{
		  					Object.keys(ratings).map((name, i) => 	
		  						<RatingItem key={i}
		  							name={ name }
		  							rating={ ratings[name] }
		  							winners={ winners[name] }
		  							selectedUser={ selectedRatings ? selectedRatings[name] : null }
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

  	// _getDataObjects() {
  	// 	let users, ratings, winners

  	// 	const { data, month } = this.props,
  	// 		daysInMonth = new Date(2018, month, 0).getDate()

  	// 	if (data && data.length) {
  	// 		users = createUsersObj(data)
  	// 		ratings = createRatingsObj(data, users, daysInMonth)
  	// 		winners = createWinnersObj(ratings)
  	// 	}
  	// 	return { users, ratings, winners }
  	// }
}

export default Ratings
