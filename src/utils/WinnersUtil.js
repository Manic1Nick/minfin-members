export function createWinnersObj(ratingsObj) {
	let winnersObj = {}, // { ratingName: [] }
		rating = [], maxScores = 0

	Object.keys(ratingsObj).forEach(ratingName => {
		let winners = []

		rating = ratingsObj[ratingName]
		maxScores = rating[0].scores

		let i = 0
		while(rating[i].scores === maxScores) winners.push(rating[i++])
		
		winnersObj[ratingName] = winners	
	})

	return winnersObj
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