from typing import Dict


class Node:
    def __init__(self, key: str, type: int):
        self.key = key
        self.type = type


    @property
    def color(self) -> str:
        return self._color_dict[self.type]


    @property
    def _color_dict(self) -> Dict[int, str]:
        return {
            0: '-',
            1: 'Red',
            2: 'Green'
        }


    def __repr__(self):
        return f"Node({self.key}, {self.color})"
