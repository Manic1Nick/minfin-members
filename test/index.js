const array1 = [ 
	{ username: 'AAA', date: '2018.10.26', vote: 0, message: 'message AAA' }, 
	{ username: 'BBB', date: '2018.10.27', vote: 1, message: 'message BBB http' },
	{ username: 'CCC', date: '2018.10.01', vote: 2, message: 'message CCC' },
	{ username: 'DDD', date: '2018.10.20', vote: 3, message: 'message DDD' },
	{ username: 'EEE', date: '2018.10.17', vote: 4, message: 'message EEE http' }
],
array2 = [ 
	{ username: 'AAA', date: '2018.10.02', vote: 9, message: 'message AAA' }, 
	{ username: 'BBB', date: '2018.10.20', vote: 8, message: 'message BBB http' },
	{ username: 'CCC', date: '2018.10.16', vote: 7, message: 'message CCC' },
	{ username: 'DDD', date: '2018.10.16', vote: 6, message: 'message DDD http' },
	{ username: 'EEE', date: '2018.10.06', vote: 5, message: 'message EEE' }
]

const comments = [ ...array1, ...array2 ]
const commentsByUsers = createObjCommentsByUsers(comments)

const sortedPopularMembers = getMostPopularMembers(),
	sortedComments = getMostPopularComments(),
	sortedActiveMembers = sortUsersByTotalComments(),
	sortedMembers = getBestMembers()

const RATING = {
	mostPopularMembers: getArrayNominants(sortedPopularMembers, 'votes'),
	mostPopularComments: getArrayNominants(sortedComments, 'vote'),
	mostActiveMembers: getArrayNominants(sortedActiveMembers, 'totalComments'),
	bestMembers: getArrayNominants(sortedMembers, 'score')
}

window.onload = () => {
	// document.getElementById('comments').innerHTML = printArray(comments)

	document.getElementById('best-member').innerHTML = RATING.bestMembers.length + " members: " + printArray(RATING.bestMembers)
	document.getElementById('most-popular-member').innerHTML = RATING.mostPopularMembers.length + " members: " + printArray(RATING.mostPopularMembers)
	document.getElementById('most-popular-comment').innerHTML = RATING.mostPopularComments.length + " comment: " + printArray(RATING.mostPopularComments)
	document.getElementById('most-active-member').innerHTML = RATING.mostActiveMembers.length + " members: " + printArray(RATING.mostActiveMembers)

}

function printArray(array) {
	// return array.map(el => JSON.stringify(el))
	return JSON.stringify(array)
}

/*===========================================================
	COMMON FUNCTIONS
===========================================================*/
function sortCommentsByVotes(comments) {
	return comments.sort((a, b) => b.vote - a.vote)
}

function createObjCommentsByUsers(comments) {
	let user = '', temp = [], commentsByUsers = {} // { username: [ comments ] }

	comments.forEach(comment => {
		user = comment.username
		temp = commentsByUsers[user] || []
		commentsByUsers[user] = [ ...temp, comment ]		
	})

	return commentsByUsers	
}

function createArrayUsersByCommentsQuantities() {
	let arrayUsersQuantities = [], temp = {} // { username: totalComments }

	Object.keys(commentsByUsers).forEach(username => {
		arrayUsersQuantities.push({ 
			username,
			totalComments: commentsByUsers[username].length 
		})
	})

	return arrayUsersQuantities
}

function createArrayUsersByCommentsVotes() {
	let arrayUsersVotes = [], temp = {} // { username: votes }

	Object.keys(commentsByUsers).forEach(username => {
		arrayUsersVotes.push({ 
			username,
			votes: commentsByUsers[username].reduce((a, b) => a.vote + b.vote)
		})
	})

	return arrayUsersVotes
}

function getArrayNominants(sortedArray, key) {
	let result = [ sortedArray[0] ], i = 1

	while (i < sortedArray.length - 1 && 
		sortedArray[i][key] === sortedArray[i - 1][key]) {

		result.push(sortedArray[i++])
	}

	return result
}

/*===========================================================
	BEST MEMBER
*/

function getMembersRatingObj() {
	let score = 0, membersObj = {} // { username: scores }

	function addScore(user, score) {
		if (!membersObj[user]) membersObj[user] = score
		else membersObj[user] += score
	}

	sortedPopularMembers.forEach((user, i) => {
		score = sortedPopularMembers.length - i
		addScore(user.username, score)
	})

	sortedActiveMembers.forEach((user, i) => {
		score = sortedActiveMembers.length - i
		addScore(user.username, score)
	})	
	
	return membersObj
}

function getBestMembers() {
	let membersObj = getMembersRatingObj(), array = []

	for (let username in membersObj) {
		array.push({ 
			username, 
			score: membersObj[username] 
		})
	}

	array.sort((a, b) => b.score - a.score)

	return array
	
}

/*===========================================================
	MOST POPULAR MEMBER
*/

function getMostPopularMembers() {
	let allMembers = createArrayUsersByCommentsVotes()
	allMembers.sort((a, b) => b.votes - a.votes )

	return allMembers
}

/*===========================================================
	MOST POPULAR COMMENT
*/

function getMostPopularComments() {
	let sortedComments = sortCommentsByVotes(comments)

	return sortedComments
}

/*===========================================================
	MOST ACTIVE MEMBER
*/

function sortUsersByTotalComments() {
	let allMembers = createArrayUsersByCommentsQuantities()
	allMembers.sort((a, b) => b.totalComments - a.totalComments )

	return allMembers
}


// ==========================================================
function openRules() {
	alert("RULES")
}

const ratings = [ 'best-member', 'most-popular-member', 'most-popular-comment', 'most-active-member' ]

function openRating(index) {
	let rating = document.getElementById(ratings[index]).innerText

	document.getElementById("overlay-inner").innerHTML = rating
  	document.getElementById("all-rating").style.width = "100%"
}

function closeRating(index) {
  	document.getElementById("all-rating").style.width = "0%"
}