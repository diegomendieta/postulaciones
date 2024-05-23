import unittest
from route import Route


class TestRoute(unittest.TestCase):
    def test_neighbors(self):
        nodes = ['A', 'B', 'C', 'D']
        route = Route('A', nodes)

        self.assertCountEqual(route.neighbors('C'), ['B', 'D'])


if __name__ == "__main__":
    unittest.main()
