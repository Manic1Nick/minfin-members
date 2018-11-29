import React, { Component } from 'react'
import './RatingItem.css'

const NAMES_RUS = {
	bestMembers: 			'лучший форумчанин',
	mostValuableMembers: 	'самый ценный форумчанин', 
	mostPopularMembers: 	'читательские симпатии',
	mostActiveMembers: 		'заслуженный работник форума',
	bestNewsBots: 			'лучший поставщик новостей',
	mrShort: 				'мистер краткость',
	mrLong: 				'мистер длинный язык',
	mrWhy: 					'почемучка месяца',
	mrLoud: 				'самый крикливый форумчанин',
	mrSmile: 				'самый весёлый форумчанин',
	mostPopularComments: 	'лучший комментарий',
	mostPopularNews: 		'самая популярная новость',
	mostPopularJokes: 		'самая популярная шутка'
}

/*
	worstNewsBots: 			'Худший поставщик новостей',
	mostPopularWord: 		'Самое популярное слово'
*/

class RatingItem extends Component {
	renderWinnerName(winners) {
		return(
			<div className='winner-name-box'>
			{ 
				winners.length
					? winners.map((winner, i) => <span key={i}>{ winner.username }</span>) 
					: <span>-</span>
			}
			</div>
		)
	}

	renderWinnerPlace(place) {
		return(
			<div className='winner-place-box'>
				<div className='winner-circle'>
					<span>{ place }</span>
				</div>
			</div>
		)
	}

	renderWinnerScores(scores, description) {
		return(
			<div className='winner-scores-box'>
			  	<div className='winner-circle'>
			  		<span>{ scores || '-' }</span>
			  	</div>
			  	
			</div>
		)
	}
 
  	render() {
  		const { name, rating, winners, selectedUser, openRating } = this.props

  		let users = winners,
  			place = 1,
  			scores = winners[0].scores,
  			description = winners[0].description

  		if (selectedUser) {
  			users = selectedUser.length ? [selectedUser[0]] : []
  			place = selectedUser.length ? selectedUser[0].place : '-'
  			scores = selectedUser.length ? selectedUser[0].scores : '-'
  			description = selectedUser.length ? selectedUser[0].description : ''
  		}

		return (
			<div className='RatingItem'>
				<div className='title'>{ NAMES_RUS[name] }</div>
				<div className='winner' onClick={ () => openRating(rating) }>
					{ this.renderWinnerName(users) }
					{ this.renderWinnerPlace(place) }
				  	{ this.renderWinnerScores(scores) }
			  	</div>
			  	<div className='winner-scores-description'>{ description }</div>
		  	</div>
		)
  	}
}

export default RatingItem
