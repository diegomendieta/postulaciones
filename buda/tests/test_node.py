import unittest
from node import Node


class TestNode(unittest.TestCase):
    def test_color_null(self):
        node = Node('A', 0)
        self.assertEqual(node.color, '-')

    def test_color_red(self):
        node = Node('B', 1)
        self.assertEqual(node.color, 'Red')


    def test_color_green(self):
        node = Node('C', 2)
        self.assertEqual(node.color, 'Green')


if __name__ == "__main__":
    unittest.main()
