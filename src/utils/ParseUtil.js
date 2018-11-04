import { Parser } from 'htmlparser2'



export function parseDataToArray(data) {
    let array = []

    data = getFullComments(data)
    array = parseFullComments(data)
    array = concatArray(array)
    array = createCommentsArray(array)

    return array
}

export function getFullComments(data) {
        const startMarker = '<div id="commentFullList">',
            finishMarker = '<div class="for-set-comment">',

            startIndex = data.indexOf(startMarker),
            finishIndex = data.indexOf(finishMarker)

        return data.substring(startIndex, finishIndex)
    }

export function parseFullComments(data) {
        let arrayText = []

        let parser = new Parser({
            ontext: (text) => {
                text = text.trim()

                if ((text.length === 1 && text === '0') ||
                    (text.length > 1 && text !== 'удаленный комментарий')) {

                    arrayText.push(text)
                }
            }
        }, { decodeEntities: true })
        
        parser.write(data)
        parser.end()

        return arrayText
    }

export function concatArray(array) {
        let i = 0, temp = [], result = []

        while(i < array.length) {
            if (isScore(array[i])) {
                if (temp.length > 3) temp = concatMessage(temp)
                if (temp.length > 0) result.push(temp)

                temp = []
            }
            temp.push(array[i++])
        }
        return result
    }

function isScore(text) {
    return (text.startsWith('+') && parseInt(text)) || text === '0'
}

function concatMessage(array) {
    let i = 3, message = ''

    while (i < array.length) {
        message += (" " + array[i++])
    }
    array[3] = message.trim()

    return array.slice(0, 4)
}

export function createCommentsArray(array) {
    let comments = [], i = 0

    while(i < array.length ) {
        let row = array[i++], comment = {}

        comment.vote = parseInt(row[0])
        comment.username = row[1]
        comment.date = row[2]
        comment.message = row[3]

        if (Object.keys(comment).length === 4 
                && comment
                && comment.username
                && comment.username !== 'undefined' 
                && comment.username.length) {

            comments.push(comment)
        }
    }
    return comments
}
