const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf-8').split('\n').map(i => +i)

console.log(input)

elfIndex = 0
results = []

const processLine = (line) => {
    if(results[elfIndex])
        results[elfIndex] += line
    else
        results[elfIndex] = line
}

input.forEach(line => {
    if(line == 0) {
        elfIndex += 1
    }
    processLine(line)
})

const sortedResults = results.sort((a,b) => b-a)
const topThreeSum = sortedResults.slice(0,3).reduce((sum, a) => sum + a, 0)

console.log(sortedResults[0])
console.log(topThreeSum)