import React, { Component } from 'react'
import './RatingItem.css'
import imgLeft1 from './resources/bay_leaf_left_1_s.png'
import imgLeft2 from './resources/bay_leaf_left_2_s.png'
import imgLeft3 from './resources/bay_leaf_left_3_s.png'
import imgRight1 from './resources/bay_leaf_right_1_s.png'
import imgRight2 from './resources/bay_leaf_right_2_s.png'
import imgRight3 from './resources/bay_leaf_right_3_s.png'
import imgEmpty from './resources/bay_leaf_empty.png'

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
		const winnersUsernames = winners.map(winner => winner.username)

		return(
			<div className='winner-name-box'>
				<span>{ winnersUsernames.join() }</span>
			</div>
		)
	}

	renderWinnerPlace(place) {
		let imgObj = {
			left: { 1: imgLeft1, 2: imgLeft2, 3: imgLeft3 },
			right: { 1: imgRight1, 2: imgRight2, 3: imgRight3 }
		}
		let styleImg = { opacity: place > 3 ? 0 : 1 }

		return(
			<div className='winner-place-box'>
				<img src={ imgObj.left[place] || imgEmpty } alt='leaf-bay-left-img' style={ styleImg } />
				<div className='winner-circle'>
					<span>{ place }</span>
				</div>
				<img src={ imgObj.right[place] || imgEmpty } alt='leaf-bay-right-img' style={ styleImg } />
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
  		const { ratingName, rating, winners, selectedUser, openRating } = this.props

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
				<div className='title'>{ NAMES_RUS[ratingName] }</div>
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
