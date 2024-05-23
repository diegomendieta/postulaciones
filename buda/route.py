from collections import defaultdict
from typing import List, DefaultDict


class Route:
    def __init__(self, key: str, nodes: List[str]):
        self.key = key
        self.nodes = nodes
        self.edges = self._build_edges(nodes)


    def neighbors(self, node_key: str) -> List[str]:
        return self.edges[node_key]


    def _build_edges(self, nodes: List[str]) -> DefaultDict[str, List[str]]:
        edges: DefaultDict[str, List[str]] = defaultdict(list)

        for u, v in zip(nodes, nodes[1:]):
            edges[u].append(v)
            edges[v].append(u)

        return edges


    def __repr__(self):
        return f"Route({self.key}, {str(self.nodes)})"
