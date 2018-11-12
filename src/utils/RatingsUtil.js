const RATINGS = {
	bestMembers: [],
	mostValuableMembers: [],
	mostPopularComments: [],
	mostPopularMembers: [],
	mostActiveMembers: [],
	bestNewsBots: [],
	worstNewsBots: [],
	mrShort: [],
	mrLong: [],
	mostPopularNews: [],
	mostPopularWord: []
}

let commentsByUsers = {}, // { user: [ comments ] }
	days = 30

export function createRatingsObj(comments, usersObj, daysInMonth) {

	commentsByUsers = usersObj
	days = daysInMonth

	RATINGS.mostPopularMembers	 = sortUsersByVotes()
	RATINGS.mostPopularComments	 = sortComments(comments)
	RATINGS.mostActiveMembers	 = sortUsersByTotalComments()
	RATINGS.mostValuableMembers	 = sortUsersByAverageVote()
	RATINGS.bestMembers			 = sortUsersByScores()
	RATINGS.bestNewsBots		 = sortUsersByCommentsWithLinks().best
	RATINGS.worstNewsBots		 = sortUsersByCommentsWithLinks().worst
	RATINGS.mrShort				 = sortUsersByMessagesLength().short
	RATINGS.mrLong				 = sortUsersByMessagesLength().long
	RATINGS.mostPopularNews		 = sortMessagesWithLinksByVotes(comments)
	RATINGS.mostPopularWord		 = sortWordsInMessages(comments)

	return RATINGS
}

/*===========================================================
	COMMON FUNCTIONS
===========================================================*/
function sortCommentsByVotes(comments) {
	return comments.sort((a, b) => {
		return b.scores - a.scores
	})
}

function addDescriptionMessage(comments) {
	comments.forEach(c => {
		c.description = `
			${c.message ? c.message.substring(0, 200) : 'error'}...
			Количество голосов: ${c.scores}
		`
	})
}

function commentIsNews(comment) {
	return comment.message && comment.message.indexOf('http') >= 0
}

function createArrayUsersByCommentsQuantities() {
	let arrayUsersQuantities = [], quantity = 0, scores = 0

	for (let username in commentsByUsers) {
		quantity = commentsByUsers[username].length
		scores = Math.round(quantity / days * 10) / 10

		arrayUsersQuantities.push({ 
			username,
			quantity,
			days,
			scores,
			description: `Среднее количество комментариев в день: ${scores}`
		})
	}

	return arrayUsersQuantities
}

function createArrayUsersByCommentsVotes() {
	let arrayUsersVotes = [], scores = 0

	for (let username in commentsByUsers) {
		let totalVotes = 0
		commentsByUsers[username].forEach(comment => {
			// comments with news not includes!
			if (!commentIsNews(comment)) 
				totalVotes += comment.scores
		})

		scores = Math.round(totalVotes / days * 10) / 10

		arrayUsersVotes.push({ 
			username,
			totalVotes,
			days,
			scores,
			description: `Среднее количество полученных голосов в день: ${scores}`
		})
	}

	return arrayUsersVotes
}

function createArrayUsersWithLinkInComments() {
	let arrayUsersWithLinks = [], scores = 0

	for (let username in commentsByUsers) {
		let quantity = 0, totalVotes = 0
		commentsByUsers[username].forEach(comment => {
			if (commentIsNews(comment)) {
				quantity++
				totalVotes += comment.scores
			}
		})

		// let scores = (totalVotes && quantity) ? (totalVotes / quantity) : 0
		if (quantity && quantity >= days) {
			scores = Math.round(totalVotes / quantity * 10) / 10

			arrayUsersWithLinks.push({ 
				username,
				totalVotes,
				quantity,
				scores,
				description: `Средняя оценка за каждую оставленную новость: ${scores}`
			})
		}
	}

	return arrayUsersWithLinks
}

// function createArrayUsersWithoutLinkInComments() {
// 	let arrayUsersWithoutLinks = [], scores = 0

// 	for (let username in commentsByUsers) {
// 		let quantity = 0
// 		commentsByUsers[username].forEach(comment => {
// 			if (!commentIsNews(comment)) quantity++
// 		})

// 		if (quantity) {
// 			scores = Math.round(quantity / days * 10) / 10

// 			arrayUsersWithoutLinks.push({ 
// 				username,
// 				quantity,
// 				days,
// 				scores
// 			})
// 		}
// 	}

// 	return arrayUsersWithoutLinks
// }

function createArrayUsersByAverageLengthMessages() {
	let array = [], scores = 0

	for (let username in commentsByUsers) {
		let summ = 0, messages = commentsByUsers[username]

		messages.forEach(comment => { 
			if (comment.message) summ += comment.message.length
		}) 

		scores = Math.round(summ / messages.length * 10) / 10

		if (username !== 'undefined' && messages.length >= days) {
			array.push({
				username,
				totalLength: summ,
				quantity: messages.length,
				scores,
				description: `Средняя длина оставленных сообщений: ${scores}`
			})			
		}
	}

	return array
}

/*===========================================================
	BEST MEMBER
*/

function getMembersRating() {
	let scores = 0, members = {}, // { username: scores }
		ratings = [ 
			RATINGS.mostActiveMembers, 
			// RATINGS.mostPopularMembers, 
			RATINGS.mostValuableMembers 
		]

	/*
		concat ratings 
		score = summ (place in the ranking / length of ranking) (%)
	*/
	ratings.forEach(rating => {
		rating.forEach((user, i) => {
			scores = (rating.length - i) / rating.length * 100 / ratings.length

			if (!members[user.username]) members[user.username] = scores
			else members[user.username] += scores
		})
	})

	return members
}

function sortUsersByScores() {
	let membersObj = getMembersRating(), arrayMembers = [], scores = 0

	for (let username in membersObj) {
		scores = Math.round(membersObj[username] * 10) / 10

		arrayMembers.push({ 
			username, 
			scores,
			description: `Лучший показатель активность + полезность: ${scores}%`
		})
	}

	arrayMembers.sort((a, b) => b.scores - a.scores )

	return arrayMembers	
}

/*===========================================================
	MOST POPULAR MEMBER
	scores = total votes of member / days
*/

function sortUsersByVotes() {
	let array = createArrayUsersByCommentsVotes()
	array.sort((a, b) => b.scores - a.scores )

	return array
}

/*===========================================================
	MOST POPULAR COMMENT
	scores = comment with max vote
*/

function sortComments(comments) {
	let commentsWithDescriptions = addDescriptionMessage(comments),
		sortedComments = sortCommentsByVotes(comments)

	return sortedComments
}

/*===========================================================
	MOST ACTIVE MEMBER
	scores = quantity of comments / days
*/

function sortUsersByTotalComments() {
	let array = createArrayUsersByCommentsQuantities()
	// let array = createArrayUsersWithoutLinkInComments()
	array.sort((a, b) => b.scores - a.scores )

	return array
}

/*==========================================================
	MOST VALUABLE MEMBER
	scores = total votes of member / quantity of comments
*/

function sortUsersByAverageVote() {
	let array = [], quantity = 0, votes = 0, scores = 0,
		{ mostPopularMembers } = RATINGS

	mostPopularMembers.forEach(member => {
		votes = member.totalVotes
		quantity = commentsByUsers[member.username].length
		scores = Math.round(votes / quantity * 10) / 10

		if (quantity >= days) {
			array.push({
				username: member.username,
				votes,
				quantity,
				scores,
				description: `Лучшая средняя оценка за оставленные комментарии: ${scores}`
			})			
		}

	})

	array.sort((a, b) => b.scores - a.scores )

	return array
}

/*===========================================================
	BEST NEWS BOT
	scores = max total votes in comments with links / quantity comments with links
	(quantity must be more than "days")

	WORST NEWS BOT
	scores = min total votes in comments with links / quantity comments with links
	(quantity must be more than "days")
*/

function sortUsersByCommentsWithLinks() {
	let arrayBest = createArrayUsersWithLinkInComments(days),
		arrayWorst = [].concat(arrayBest),
		result = {}

	arrayBest.sort((a, b) => b.scores - a.scores )
	arrayWorst.sort((a, b) => a.scores - b.scores )

	result.best = arrayBest
	result.worst = arrayWorst

	return result
}

/*===========================================================
	MR. SHORT
	scores = min total length of message / quantity of message
	(quantity must be more than "days")

	MR. LONG TONGUE
	scores = max total length of message / quantity of message
	(quantity must be more than "days")
*/

function sortUsersByMessagesLength() {
	let arrayShort = createArrayUsersByAverageLengthMessages(days),
		arrayLong = [].concat(arrayShort),
		result = {}

	arrayShort.sort((a, b) => a.scores - b.scores)
	arrayLong.sort((a, b) => b.scores - a.scores)

	result.short = arrayShort
	result.long = arrayLong

	return result
}

/*===========================================================
	MOST POPULAR NEWS
	scores = max total votes in comment with link
*/

function sortMessagesWithLinksByVotes(comments) {
	let sortedComments = sortCommentsByVotes(comments)

	let commentsWithLinks = sortedComments
		.filter(comment => {
			if (comment.message) return comment.message.indexOf('http') >= 0 
		})

	return commentsWithLinks
}

/*===========================================================
	MOST POPULAR WORD
	scores = max popular word in comments / days
*/

function sortWordsInMessages(comments) {
	let array = [], scores = 0, wordsObj = createWordsObj(comments)

	for (let word in wordsObj) {
		scores = Math.round(wordsObj[word] / days * 10) / 10

		if (scores > 1) {
			array.push({
				word,
				quantity: wordsObj[word],
				days,
				scores
			})
		}
	}
	array.sort((a, b) => b.scores - a.scores)

	return array
}

function createWordsObj(comments) {
	let wordsObj = {}, wordScores = 0

	comments.forEach(comment => {
		let arrayMessage = createArrayWordsFromCommentMessage(comment)

		arrayMessage.forEach(word => {
			wordScores = wordsObj[word] ? wordsObj[word] + 1 : 1
			wordsObj[word] = wordScores
		})
	})
	return wordsObj
}

function createArrayWordsFromCommentMessage(comment) {
	let message = comment.message 
		? comment.message.toLowerCase()
			.replace(/[.,?!()-=*1234567890]/g, '')
		: ''

	return message.split(' ').filter(word => word.length > 3)
}