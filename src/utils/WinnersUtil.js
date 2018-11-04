// const WINNERS = {
// 	mostPopularMembers: [],
// 	mostPopularComments: [],
// 	mostActiveMembers: [],
// 	bestMembers: [],
// 	bestNewsBots: [],
// 	worstNewsBots: [],
// 	mrShort: [],
// 	mrLong: [],
// 	mostPopularNews: [],
// 	mostPopularWord: []
// }

export function createWinnersObj(RATINGS) {
	let WINNERS = {}, maxScores = 0

	for (let key in RATINGS) {
		// WINNERS[key] = getArrayWinners(RATINGS[key])

		maxScores = RATINGS[key][0].scores
		
		WINNERS[key] = RATINGS[key].filter(member => member.scores === maxScores)

		// if (key === 'mostPopularWord') RATINGS[key].forEach(member => { console.log(member) })
 	}
	
	// WINNERS.mostPopularMembers	 = getArrayWinners(RATINGS.mostPopularMembers, 'votes')
	// WINNERS.mostPopularComments	 = getArrayWinners(RATINGS.mostPopularComments, 'vote')
	// WINNERS.mostActiveMembers	 = getArrayWinners(RATINGS.mostActiveMembers, 'totalComments')
	// WINNERS.bestMembers			 = getArrayWinners(RATINGS.bestMembers, 'score')
	// WINNERS.bestNewsBots		 	 = getArrayWinners(RATINGS.bestNewsBots, 'commentsWithLinks')
	// WINNERS.worstNewsBots		 = getArrayWinners(RATINGS.worstNewsBots, 'commentsWithLinks')
	// WINNERS.mrShort				 = getArrayWinners(RATINGS.mrShort, 'averageLength')
	// WINNERS.mrLong				 = getArrayWinners(RATINGS.mrLong, 'averageLength')
	// WINNERS.mostPopularNews		 = getArrayWinners(RATINGS.mostPopularNews, 'vote')
	// WINNERS.mostPopularWord		 = getArrayWinners(RATINGS.mostPopularWord, 'totalWords')

	return WINNERS
}

// function getArrayWinners(sortedArray) {
// 	let result = [ sortedArray[0] ], i = 1, key = 'scores'

// 	while (i < sortedArray.length - 1 && 
// 		sortedArray[i][key] === sortedArray[i - 1][key]) {

// 		result.push(sortedArray[i++])
// 	}

// 	return result
// }
