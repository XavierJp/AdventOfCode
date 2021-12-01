
import time

def timeit(f):

    def timed(*args, **kw):

        ts = time.time()
        result = f(*args, **kw)
        te = time.time()

        print(f'func:{f.__name__} : took:{te-ts}')
        return result

    return timed

@timeit
def load(file_name):
    with open(file_name, "r") as f:
        data = f.readlines()
        return [int(d[:-1]) for d in data]

def reccur_fuel(fuel, mass):
    fuel_needed = int(mass/3) - 2
    if (fuel_needed<=0):
        return fuel
    else:
        return reccur_fuel(fuel+fuel_needed, fuel_needed)

def main():
    data = load("1_input.txt")
    print(sum([reccur_fuel(0, d) for d in data]))


if __name__ == '__main__':
    main()
