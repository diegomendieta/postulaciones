from node import Node
from route import Route
from collections import deque, defaultdict
from typing import Dict, TextIO, Deque, List, DefaultDict


class Subway:
    def __init__(self):
        self.nodes: Dict[str, Node] = {}
        self.routes: Dict[str, Route] = {}

        self.node_routes: DefaultDict[str, List[str]] = defaultdict(list)


    def load_network(self, filepath: str):
        with open(filepath, 'r') as file:
            self._load_nodes(file)
            self._load_routes(file)

        self._preprocess_node_routes()


    def get_shortest_path(self, origin_node_key: str, destiny_node_key: str, train_color='-'):
        self._breadth_first_search(origin_node_key, destiny_node_key, train_color)

        return self._retrieve_path(origin_node_key, destiny_node_key)

    # ---

    def _load_nodes(self, file: TextIO) -> Dict[str, Node]:
        number_of_nodes = int(file.readline())
        for _ in range(number_of_nodes):
            key, type = file.readline().strip().split(",")

            node = Node(key, int(type))
            self.nodes[key] = node


    def _load_routes(self, file: TextIO) -> Dict[str, Route]:
        number_of_routes = int(file.readline())
        for route_index in range(number_of_routes):
            nodes = file.readline().strip().split(",")
            self.routes[route_index] = Route(route_index, nodes)


    def _preprocess_node_routes(self):
        for route_key, route in self.routes.items():
            for node_key in route.nodes:
                self.node_routes[node_key].append(route_key)


    def _breadth_first_search(self, origin_node_key: str, destiny_node_key: str, train_color='-'):
        origin_node = self.nodes[origin_node_key]
        destiny_node = self.nodes[destiny_node_key]

        self._check_feasibility(origin_node, destiny_node, train_color)

        visited_node_keys = set()
        queue: Deque[Node] = deque([origin_node])

        self.path: Dict[str, str] = {}

        while queue:
            node = queue.popleft()
            visited_node_keys.add(node.key)

            for reachable_node in self._get_reachable_nodes(node, train_color):
                if reachable_node.key in visited_node_keys:
                    continue

                self.path[reachable_node.key] = node.key
                if reachable_node is destiny_node:
                    return
                
                queue.append(reachable_node)


    def _check_feasibility(self, origin_node: Node, destiny_node: Node, train_color: str):
        if not self._is_reachable(origin_node, train_color):
            raise ValueError("The origin node is not accessible by the train.")

        if not self._is_reachable(destiny_node, train_color):
            raise ValueError("The destiny node is not accessible by the train.")


    def _get_reachable_nodes(self, node: Node, train_color: str, seen_node_keys=None) -> List[Node]:
        reachable_nodes: List[Node] = []
        seen_node_keys = set() if seen_node_keys is None else seen_node_keys

        for route_key in self.node_routes[node.key]:
            route = self.routes[route_key]

            neighbors = route.neighbors(node.key)
            for neighbor_node_key in neighbors:
                if neighbor_node_key in seen_node_keys:
                    continue

                neighbor_node = self.nodes[neighbor_node_key]

                if self._is_reachable(neighbor_node, train_color):
                    reachable_nodes.append(neighbor_node)
                else:
                    reachable_nodes.extend(self._get_reachable_nodes(neighbor_node, train_color, seen_node_keys))

        return reachable_nodes


    def _is_reachable(self, node: Node, train_color='-') -> bool:
        if train_color == '-':
            return True

        if node.color == '-':
            return True

        return train_color == node.color


    def _retrieve_path(self, origin_node_key: str, destiny_node_key: str):
        path = []

        node_key = destiny_node_key
        while True:
            path.append(node_key)
            if node_key == origin_node_key:
                return "->".join(reversed(path))
            
            node_key = self.path[node_key]
