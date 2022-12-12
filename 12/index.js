const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\r\n");

console.log(input);

const alphabet = "abcdefghijklmnopqrstuvwxyz";
elevation = {};

for (let i = 0; i < alphabet.length; i++) {
    elevation[alphabet[i]] = alphabet[i].charCodeAt(0) - "a".charCodeAt(0);
}

console.log(elevation);

const width = input.length;
const height = input[0].length;
const V = width * height;

start = undefined;
goal = undefined;

graph = {};
distances = {};
visited = {};

// formating the input
for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
        graph[[i, j]] = [];
        if (input[i][j] === "S") {
            input[i][j] = "a";
            start = [i, j];
            continue;
        }
        if (input[i][j] === "E") {
            input[i][j] = "z";
            goal = [i, j];
        }

        // going through the neighbors
        [
            [i - 1, j],
            [i + 1, j],
            [i, j + 1],
            [i, j - 1],
        ].forEach((n) => {
            const [nx, ny] = n;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                if (elevation[graph[[nx, ny]]] - elevation[graph[[i, j]]])
                    graph[[i, j]].push([nx, ny]);
            }
        });
    }
}

function minDistance(dist, visited) {
    let min = Number.MAX_VALUE;
    let min_node = undefined;

    Object.keys(dist).forEach((vertex) => {
        if (visited[vertex] == false && dist[vertex] < min) {
            min = dist[vertex];
            min_node = vertex;
        }
    });

    return min_node;
}

function shortestPath(graph) {
    pathList = [goal]

    var Q = Object.keys(graph).filter((vertex) => vertex != goal);
    // var Q = [[0, String(goal)]];
    var pathLenght = { goal: 0 };
    console.log(Q)
    while (Q.length > 0) {
        const u = minDistance(distances, visited);
        console.log(u)
        const i = Q.findIndex((vertex) => vertex[1] == String(u));
        const cost = Q[i][0] + 1;
        Q.splice(i, 1);
        console.log(Q);
        graph[u].forEach((v) => {
            if (!pathLenght[v] || cost < pathLenght[v]) {
                pathLenght[v] = cost;
                Q.push([[cost, v]]);
            }
        });
    }

    console.log(pathLenght)
}

dijkstra(graph);
