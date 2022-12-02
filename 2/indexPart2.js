const fs = require('fs')
const readline = require('readline')

score = 0
lineCount = 0

const processLine = (line) => {
    const input = line.split(" ")
    const [his, result] = input

    hisIndex = his.charCodeAt(0) - 'A'.charCodeAt(0)
    resultIndex = result.charCodeAt(0) - 'X'.charCodeAt(0)

    if(resultIndex == 0) {
        score += 1 + (((hisIndex - 1)%3 + 3) % 3)
    } else if(resultIndex == 1) {
        score += 3 + hisIndex + 1
    } else if(resultIndex == 2) {
        score += 6 + (((hisIndex + 1)%3 + 3) % 3) + 1
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