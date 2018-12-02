import React, { Component } from 'react'
import Header from './Header'
import TopNav from './TopNav'
import Ratings from './Ratings'
import Overlay from './Overlay'
import './App.css'

import { parseDataToArray } from './utils/ParseUtil'
import { createUsersObj } from './utils/UsersUtil'
import { createRatingsObj } from './utils/RatingsUtil'
import { createWinnersObj, createSelectedUserObj } from './utils/WinnersUtil'

const DEFAULT_MONTH = 10
// 	daysInMonth = new Date(2018, MONTH, 0).getDate()

// let localData = require('./resources/comments_' + (MONTH > 9 ? MONTH : '0' + MONTH) + '.json')
// let localData = null

// import jsonfile from 'jsonfile'


class App extends Component {
  	constructor() {
		super()
		this.state = {
			month: DEFAULT_MONTH, 
			data: null,
			loadedData: null,
			selectedUser: '',
			activeRating: [],
			openingOverlay: false
		}
  	}

  	componentWillMount() {
  		this._setData(DEFAULT_MONTH)
  	}

  	handleOpenRating(rating) {
  		this.setState({ 
  			activeRating: rating,
  			openingOverlay: true
  		})
  	}

  	handleCloseOverlay() {
  		this.setState({ openingOverlay: false })
  	}

  	handleChangePeriod(month) {
  		if (this.state.month !== month)	this._setData(month)
  	}

  	openUser(selectedUser) {
  		this.setState({ selectedUser })
  	}

  	render() {

  		const { month, data, selectedUser, loadedData, activeRating, openingOverlay } = this.state,
  			daysInMonth = new Date(2018, month, 0).getDate(),
  			usernames = Object.keys(data.users)

  		if (selectedUser) data.selectedRatings = createSelectedUserObj(data.ratings, selectedUser)
  		else data.selectedRatings = null

		return (
	  		<div className="App">
				<Header />
				<TopNav 
					usernames={ usernames }
					openUser={ this.openUser.bind(this) } 
				/>

				{ 
					data 
						? 	<Ratings 
								data={ data } 
								month={ month } 
								changePeriod={ this.handleChangePeriod.bind(this) }
								openRating={ this.handleOpenRating.bind(this) } 
								openUser={ this.openUser.bind(this) } 
							/> 

						: !data && loadedData.length === daysInMonth
							? 
								<Ratings 
									data={ [].concat(...loadedData) } 
									month={ month } 
									openRating={ this.handleOpenRating.bind(this) }
								/> 
							: 
								'Loading data.......' 
				}

				<Overlay 
					content={ activeRating } 
					opening={ openingOverlay } 
					close={ this.handleCloseOverlay.bind(this) } 
				/>
	  		</div>
		)
  	}

  	_setData(month) {
  		let localData = require('./resources/comments_' + (month > 9 ? month : '0' + month) + '.json')

  		if (localData) {
  			console.log('success load local data from', month, 'month with', localData.length, 'comments')

  			let data = this._getDataObjects(localData, month)
  			data.length = localData.length

  			this.setState({ month, data })

  		} else {
	  		console.log('no local data! load from url...')

  			let date = new Date(2018, month - 1, 1), 
  				daysInMonth = new Date(2018, month, 0).getDate(), 
  				url = ''

  			for (let i = 0; i < daysInMonth; i++) {
				url = 'https://minfin.com.ua/' + this._formatDate(date) + '/currency/'
				this._loadData(url)		
				date.setDate(date.getDate() + 1)
			}
  		}
  	}

  	_loadData(url) {
		fetch("https://cors.io/?" + url)
	  		.then(response => {
		  		console.log(url + " -> " + response.ok);
		  		if(response.ok) {
					return response.text()
		  		} else {
					// throw new Error("Can't get data from " + url)
		  		}         
	  		})
	  		.then(page => {
		  		let newData = page ? parseDataToArray(page) : [],
		  			{ loadedData } = this.state

		  		loadedData.push(newData)
		  		this.setState({ loadedData })

		  		// this._writeJsonFile(data)
	  		})
	  		.catch(err => {
				console.log("failed to load ", url, err.message)
	  		})
  	}

  	_formatDate(date) {
		let year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate()

		if (day < 10) {
		  day = '0' + day;
		}
		if (month < 10) {
		  month = '0' + month;
		}

		return (year + '/' + month + '/' + day)
  	}

  	_getDataObjects(data, month) {
  		let users, ratings, winners

  		const daysInMonth = new Date(2018, month, 0).getDate()

  		if (data && data.length) {
  			users = createUsersObj(data)
  			ratings = createRatingsObj(data, users, daysInMonth)
  			winners = createWinnersObj(ratings)
  		}
  		return { users, ratings, winners }
  	}

  	// 	_writeJsonFile(data) {
	// 		const file = '../tmp/data.json'
 
	// 		jsonfile.writeFile(file, JSON.stringify(data))
  	// 			.then(res => {
  	//   			console.log('Write complete')
  	// 			})
  	// 			.catch(error => console.error(error))	
  	// 	}
}

export default App
