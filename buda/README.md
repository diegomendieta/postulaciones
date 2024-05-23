# Buda application

The problem consists of finding the shortest path between subway stations in Santiago, considering the existence of uncolored stations, green stations, and red stations.

A problem instance is represented by a `.txt` file. An instance file consists of the following:
- The first line indicates the number "N" of subway stations in the network.
- The next "N" lines indicate the name of the station along with its color (0 is uncolored, 1 is red, and 2 is green).
- The following line indicates the number "M" of routes in the network.
- The next "M" lines represent the sequence of stations that make up each route.

## Solution

The solution consists of a Python script that implements a `breadth first search` algorithm to find the shortest path between two nodes.

## How to run

To evaluate different instances of the problem, you should specify the file path of the instance file in the `FILEPATH` variable in `main.py`. To evaluate different origins, destinations, and colors in the instance, you should set the `ORIGIN`, `DESTINY`, and `COLOR` variables in `main.py`.

```sh
python3 main.py
```