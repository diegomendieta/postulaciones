import unittest
from unittest.mock import mock_open, patch
from subway import Subway


class TestSubway(unittest.TestCase):
    @patch("builtins.open", new_callable=mock_open, read_data=
    """5
      A,0
      B,1
      C,2
      D,1
      E,1
      2
      A,B,C
      D,B,E
    """)
    def test_load_network(self, mock_file):
        subway = Subway()
        subway.load_network('fake_filepath.txt')

        mock_file.assert_called_with("fake_filepath.txt", 'r')

        self.assertIn('A', subway.nodes)
        self.assertIn('B', subway.nodes)
        self.assertIn('C', subway.nodes)
        self.assertIn('D', subway.nodes)
        self.assertIn('E', subway.nodes)

        self.assertCountEqual(subway.routes[0].nodes, ['A', 'B', 'C'])
        self.assertCountEqual(subway.routes[1].nodes, ['D', 'B', 'E'])

        self.assertCountEqual(subway.node_routes['A'], [0])
        self.assertCountEqual(subway.node_routes['B'], [0, 1])
        self.assertCountEqual(subway.node_routes['C'], [0])
        self.assertCountEqual(subway.node_routes['D'], [1])
        self.assertCountEqual(subway.node_routes['E'], [1])


    @patch("builtins.open", new_callable=mock_open, read_data=
    """7
      A,0
      B,1
      C,2
      D,1
      E,0
      F,2
      G,2
      2
      A,B,C,D,E
      A,F,G,E
    """)
    def test_get_shortest_path_for_null_color_train(self, mock_file):
        subway = Subway()
        subway.load_network('fake_filepath.txt')

        shortest_path = subway.get_shortest_path('A', 'E')
        self.assertEqual(shortest_path, 'A->F->G->E')


    @patch("builtins.open", new_callable=mock_open, read_data=
    """7
      A,0
      B,1
      C,2
      D,1
      E,0
      F,2
      G,2
      2
      A,B,C,D,E
      A,F,G,E
    """)
    def test_get_shortest_path_for_red_train(self, mock_file):
        subway = Subway()
        subway.load_network('fake_filepath.txt')

        shortest_path = subway.get_shortest_path('A', 'E', 'Red')
        self.assertEqual(shortest_path, 'A->B->D->E')


    @patch("builtins.open", new_callable=mock_open, read_data=
    """7
      A,0
      B,1
      C,2
      D,1
      E,0
      F,2
      G,2
      2
      A,B,C,D,E
      A,F,G,E
    """)
    def test_get_shortest_path_for_red_train(self, mock_file):
        subway = Subway()
        subway.load_network('fake_filepath.txt')

        shortest_path = subway.get_shortest_path('A', 'E', 'Green')
        self.assertEqual(shortest_path, 'A->C->E')


if __name__ == "__main__":
    unittest.main()
