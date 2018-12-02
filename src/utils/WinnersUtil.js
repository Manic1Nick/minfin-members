export function createWinnersObj(ratingsObj) {
	let winners = {}, // { ratingName: [] }
		maxScores = 0

	Object.keys(ratingsObj).forEach(ratingName => {
		maxScores = ratingsObj[ratingName][0].scores
		
		winners[ratingName] = ratingsObj[ratingName].filter(member => member.scores === maxScores)		
	})

	return winners
}

export function createSelectedUserObj(ratingsObj, username) {
	let selectedObj = { username } // { ratingName: [] }

	Object.keys(ratingsObj).forEach(ratingName => {
		let topMember = ratingsObj[ratingName].find((member, i) => {
			if (member.username === username) {
				member.place = i+1
				return member
			}
		})
		selectedObj[ratingName] = [Object.assign({}, topMember)]
	})

	return selectedObj
}

function printArray(array, from, to) {
	array.forEach((el, i) => {
		if (i >= from && i <= to) console.log(el.place, el.username, el.scores)
	})
}