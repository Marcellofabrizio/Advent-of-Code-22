import heapq
import string
import sys
from collections import deque

INPUT = "input.txt"

elevation = dict(zip(string.ascii_lowercase, range(26)))
elevation.update({'S': elevation['a'], 'E': elevation['z']})


print(elevation)


def read_input():
    input = [line.strip() for line in open(INPUT)]
    return input


def create_graph(input, part_2=False):

    graph = dict()
    start = None
    goal = None
    height = len(input)
    width = len(input[0])

    for i in range(height):
        for j in range(width):
            cell = input[i][j]
            graph[(i, j)] = []
            if cell == 'E':
                goal = (i, j)

            for ni, nj in [[i+1, j], [i-1, j], [i, j-1], [i, j+1]]:
                if 0 <= ni < height and 0 <= nj < width:
                    if elevation[input[ni][nj]] - elevation[input[i][j]] >= -1:
                        graph[(i, j)].append((ni, nj))

    for i in range(height):
        for j in range(width):
            if (input[i][j] == 'S' and not part_2) or (input[i][j] == 'a' == 1 and part_2):
                start = (i, j)

    return graph, start, goal


def bfs(graph, root, goal):
    Q = deque()
    V = set()
    Q.append((root, 0))
    while Q:
        v, cost = Q.popleft()
        if v in V:
            continue
        V.add(v)
        if v == goal:
            return cost
        for w in graph[v]:
            Q.append((w, cost+1))


input = read_input()
graph, start, goal = create_graph(input)
print(bfs(graph, goal, start))

graph, start, goal = create_graph(input, True)
print(bfs(graph, goal, start))
