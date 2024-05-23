from subway import Subway


INSTANCE = 0
FILEPATH = f'instances/{INSTANCE}.txt'

ORIGIN = 'A'
DESTINY = 'F'
COLOR = '-'  # "Red", "Green" or "-"

if __name__ == "__main__":
    subway = Subway()
    subway.load_network(FILEPATH)

    shortest_path = subway.get_shortest_path(ORIGIN, DESTINY, COLOR)
    print(shortest_path)
