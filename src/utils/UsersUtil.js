export function createUsersObj(data) {
	let commentsByUsers = createObjCommentsByUsers(data)

	return commentsByUsers
}

function createObjCommentsByUsers(comments) {
	// return { username: [ comments ] }

	let user = '', temp = [], commentsByUsers = {} 

	comments.forEach(comment => {
		user = comment.username
		temp = commentsByUsers[user] || []
		commentsByUsers[user] = [ ...temp, comment ]		
	})

	return commentsByUsers	
}