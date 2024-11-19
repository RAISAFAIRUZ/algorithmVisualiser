def bfs(graph, start):
    visited = []
    queue = [start]
    steps = []

    while queue:
        node = queue.pop(0)
        if node not in visited:
            visited.append(node)
            steps.append({"type": "graph", "nodes": [{"id": n, "visited": n in visited} for n in graph.keys()]})
            queue.extend(graph[node])

    return steps

def dfs(graph, start, visited=None, steps=None):
    if visited is None:
        visited = []
    if steps is None:
        steps = []

    visited.append(start)
    steps.append({"type": "graph", "nodes": [{"id": n, "visited": n in visited} for n in graph.keys()]})

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited, steps)

    return steps
