
import time

def timeit(f):

    def timed(*args, **kw):

        ts = time.time()
        result = f(*args, **kw)
        te = time.time()

        print(f'func:{f.__name__} : took:{te-ts}')
        return result

    return timed

def load(file_name):
    with open(file_name, "r") as f:
        data = f.readline().split(',')
        return [int(d.replace('\n', '')) for d in data]

def int_code(inpu):
    i = 0
    pos = 0
    while True:
        i = inpu[pos]
        if (i == 99):
            return inpu
        elif (i == 1):
            inpu[inpu[pos+3]] = inpu[inpu[pos+1]]+inpu[inpu[pos+2]]
            pos = pos+4
        elif (i == 2):
            inpu[inpu[pos+3]] = inpu[inpu[pos+1]]*inpu[inpu[pos+2]]
            pos = pos+4
        else:
            raise Exception('Should not happen')


@timeit
def main():

    for noun in range(0, 99):
        for verb in range(0,99):
            data = load("2_input.txt")
            data[1]= noun
            data[2]= verb
            d = int_code(data)[0]
            if(d==19690720):
                print(100*noun+verb)
    print('Weiiird')

if __name__ == '__main__':
    main()
