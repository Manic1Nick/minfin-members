import React, { Component } from 'react'
import './RatingItem.css'

const NAMES_RUS = {
	bestMembers: 			'Лучший форумчанин',
	mostValuableMembers: 	'Самый ценный форумчанин', 
	mostPopularComments: 	'Лучший комментарий',
	mostPopularMembers: 	'Приз читательских симпатий',
	mostActiveMembers: 		'Заслуженный работник форума',
	bestNewsBots: 			'Лучший поставщик новостей',
	worstNewsBots: 			'Худший поставщик новостей',
	mrShort: 				'Мистер краткость',
	mrLong: 				'Мистер длинный язык',
	mostPopularNews: 		'Самая популярная новость',
	mostPopularWord: 		'Самое популярное слово'
}

class RatingItem extends Component {
	constructor() {
		super()
		this.state = {}
  	}

  	componentDidMount() {
  		
  	}

  	render() {
  		let { name, ratings, winners, openRating } = this.props

		return (
			<div className='RatingItem'>
				<div className='title'>{ NAMES_RUS[name] }</div>

				<div className='winner' onClick={ () => openRating(ratings[name]) }>
		  			<div className='winner-name'>{ winners[name][0].username }</div>
		  			<div className='winner-scores'>{ winners[name][0].description }</div>
		  		</div>
		  	</div>
		)
  	}
}

export default RatingItem
