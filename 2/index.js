const fs = require('fs')
const readline = require('readline')

score = 0
lineCount = 0

const processLine = (line) => {
    const input = line.split(" ")
    const [his, mine] = input

    hisIndex = his.charCodeAt(0) - 'A'.charCodeAt(0)
    myIndex = mine.charCodeAt(0) - 'X'.charCodeAt(0)

    if(hisIndex == ((myIndex-1)%3 + 3)%3) {
        score += 6 + myIndex + 1
    } else if(hisIndex == ((myIndex+1)%3 + 3)%3) {
        score += myIndex + 1
    } else if(hisIndex == myIndex) {
        score += 3 + myIndex + 1
    }
}

async function readFile() {

    const fileStream = fs.createReadStream('input.txt')

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    for await (const line of rl) {
        processLine(line)
    }

    console.log(score)
}

readFile()