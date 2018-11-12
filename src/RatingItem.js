import React, { Component } from 'react'
import './RatingItem.css'

const NAMES_RUS = {
	bestMembers: 			'Лучший форумчанин',
	mostValuableMembers: 	'Самый ценный форумчанин', 
	mostPopularComments: 	'Лучший комментарий',
	mostPopularMembers: 	'Любимчик публики',
	mostActiveMembers: 		'Заслуженный работник форума',
	bestNewsBots: 			'Лучший поставщик новостей',
	worstNewsBots: 			'Худший поставщик новостей',
	mrShort: 				'Мистер краткость',
	mrLong: 				'Мистер длинный язык',
	mostPopularNews: 		'Самая популярная новость',
	mostPopularWord: 		'Самое популярное слово'
}

class RatingItem extends Component {
  	render() {
  		let { name, rating, winner, openRating } = this.props

		return (
			<div className='RatingItem'>
				<div className='title'>{ NAMES_RUS[name] }</div>

				<div className='winner' onClick={ () => openRating(rating) }>
		  			<div className='winner-name'>{ winner.username }</div>
		  			<div className='winner-scores'>{ winner.description }</div>
		  		</div>
		  	</div>
		)
  	}
}

export default RatingItem
