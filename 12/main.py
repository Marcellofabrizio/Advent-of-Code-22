import heapq
import string
import sys

INPUT = "input.txt"

elevation = dict(zip(string.ascii_lowercase, range(26)))
elevation.update({'S': elevation['a'], 'E': elevation['z']})


print(elevation)


def read_input():
    input = [line.strip() for line in open(INPUT)]
    return input


def create_graph(input):

    graph = dict()
    start = None
    goal = None
    height = len(input)
    width = len(input[0])

    for i in range(height):
        for j in range(width):
            cell = input[i][j]
            graph[(i, j)] = []
            if cell == 'S':
                start = (i, j)
                continue
            if cell == 'E':
                goal = (i, j)

            for ni, nj in [[i+1, j], [i-1, j], [i, j-1], [i, j+1]]:
                if 0 <= ni < height and 0 <= nj < width:
                    if elevation[input[ni][nj]] - elevation[input[i][j]] >= -1:
                        graph[(i, j)].append((ni, nj))

    return graph, start, goal


def bfs(graph, root, goal):
    Q = []
    visited = dict(zip(graph.keys(), [False for _ in graph]))
    visited[root] = True
    Q.insert(0, root)
    count = 0
    while Q:
        v = Q.pop()
        if v == goal:
            print(count)
            return
        for w in graph[v]:
            if not visited[w]:
                count += 1
                visited[w] = True
                Q.insert(0, w)


input = read_input()
graph, start, goal = create_graph(input)
bfs(graph, goal, start)
