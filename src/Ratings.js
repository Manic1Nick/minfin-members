import React, { Component } from 'react'
import RatingItem from './RatingItem'
import DropdownPeriod from './DropdownPeriod'
import TopNav from './TopNav'
import './Ratings.css'

class Ratings extends Component {
	renderSelectedUserButton() {
		const { data, openUser } = this.props

		if (!data.selectedRatings) return null

		return(
			<div className='selected-user'>
				<div className='selected-user-btn'>
					Отобрано по: { data.selectedRatings.username } 
					<button className="closebtn" onClick={ () => openUser('') }>&times;</button>
				</div>
		  	</div>
		)
	}

  	render() {
  		const { data, month, maxMonth, openRating, openUser, changePeriod } = this.props,
  			{ users, ratings, winners, selectedRatings } = data,
  			usernames = Object.keys(users)

		return (
	  		<div className="Ratings">
	  			<TopNav 
					usernames={ usernames }
					openUser={ openUser } 
					openRules={ openRating }
				/>
				<section>
		  				<div>
		  					<DropdownPeriod 
		  						month={ month }
		  						maxMonth={ maxMonth } 
		  						openPeriod={ changePeriod } 
		  					/>
		  					{ 
		  						this.renderSelectedUserButton() 
		  					}
		  					<p>
		  						<span>Всего пользователей: { Object.keys(users).length }</span><br />
		  						<span>Всего комментариев: { data.length }</span><br />
		  					</p>
		  				{
		  					Object.keys(ratings).map((ratingName, i) => 	
		  						<RatingItem key={i}
		  							ratingName={ ratingName }
		  							rating={ ratings[ratingName] }
		  							winners={ winners[ratingName] }
		  							selectedUser={ selectedRatings ? selectedRatings[ratingName] : null }
		  							openRating={ openRating }
		  						/>	  					
		  					)
		  				}
		  				</div>
				</section>
	  		</div>
		)
  	}
}

export default Ratings
