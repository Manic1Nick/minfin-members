export function createWinnersObj(ratingsObj) {
	let winners = {}, // { nameRating: [] }
		maxScores = 0

	Object.keys(ratingsObj).forEach(name => {
		maxScores = ratingsObj[name][0].scores
		
		winners[name] = ratingsObj[name].filter(member => member.scores === maxScores)		
	})

	return winners
}

export function createSelectedUserObj(ratingsObj, username) {
	let selectedObj = {}, // { nameRating: [] }
		maxScores = 0

	Object.keys(ratingsObj).forEach(nameRating => {		
		selectedObj[nameRating] = ratingsObj[nameRating].filter((member, i) => {
			if(member.username === username) {
				member.place = i+1 
				return member
			}
		})		
	})

	selectedObj.username = username

	return selectedObj
}