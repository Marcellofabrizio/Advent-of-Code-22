import heapq
import string
import sys
from collections import defaultdict, deque

INPUT = "input.txt"

elevation = dict(zip(string.ascii_lowercase, range(26)))
elevation.update({'S': elevation['a'], 'E': elevation['z']})


def read_input():
    input = [line.strip() for line in open(INPUT)]
    return input


def create_graph(input):

    start = None
    goal = None
    height = len(input)
    width = len(input[0])
    graph = [[0 for _ in range(width)] for _ in range(height)]

    for i in range(height):
        for j in range(width):
            if input[i][j] == 'S':
                graph[i][j] = 1
                start = (i, j)
            elif input[i][j] == 'E':
                graph[i][j] = 26
                goal = (i, j)
            else:
                graph[i][j] = ord(input[i][j]) - ord('a') + 1

    return graph, start, goal


def bfs(input, graph, goal, part_2=False):
    Q = deque()
    height = len(graph)
    width = len(graph[0])

    for i in range(height):
        for j in range(width):
            if (input[i][j] == 'S' and not part_2) or (graph[i][j] == 1 and part_2):
                Q.append(((i, j), 0))

    S = set()
    while Q:
        (x, y), cost = Q.popleft()
        if (x, y) in S:
            continue
        S.add((x, y))
        if (x, y) == goal:
            return cost
        for nx, ny in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            xx = x + nx
            yy = y + ny

            if 0 <= xx < height and 0 <= yy < width:
                if graph[xx][yy] <= 1 + graph[x][y]:
                    Q.append(((xx, yy), cost+1))


input = read_input()
graph, start, goal = create_graph(input)
print("Part 1", bfs(input, graph, goal))
print("Part 2", bfs(input, graph, goal, True))
