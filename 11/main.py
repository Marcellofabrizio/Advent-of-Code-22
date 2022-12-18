import math
from functools import reduce

file = open("input.txt", 'r')
input = [line.split() for line in file if line.strip() != '']


class Monkey:

    def __init__(self, id=0, items=None, opperation=None, test=None, action=[]):
        self.id = id
        self.items = items
        self.opperation = opperation
        self.test = test
        self.action = action
        self.monki_bsns = 0

    def __str__(self):
        return f"{self.id} , {self.items} , {self.opperation} , {self.test} , {self.action}"


def parse_input():
    monkeys = []
    for i in range(0, len(input) - 1, 6):
        for j in input[i:i + 6]:
            monkey = Monkey(id=int(input[i:i + 6][0][1].strip(":")))

            string = "".join(input[i:i + 6][1][2:])
            monkey.items = [int(s) for s in string.split(',')]

            monkey.opperation = (input[i:i + 6][2][4], int(input[i:i + 6][2][5])
                                 if input[i:i + 6][2][5] != "old" else "*2")

            monkey.test = int(input[i:i + 6][3][3])

            monkey.condition_true = int(input[i:i + 6][4][5])
            monkey.condition_false = int(input[i:i + 6][5][5])

            monkeys.append(monkey)

            break
    return monkeys


def operation(lvl, t_ops):
    if isinstance(t_ops[1], int):
        if t_ops[0] == '*':
            lvl *= t_ops[1]
        else:
            lvl += t_ops[1]
    else:
        lvl *= lvl

    return lvl


monkeys = parse_input()
lcm = 1
for monkey in monkeys:
    lcm = (lcm*monkey.test)
print(lcm)

for r in range(10000):
    for monkey in monkeys:
        monkey.monki_bsns += len(monkey.items)
        for i, item in enumerate(monkey.items):
            new_lvl = operation(item, monkey.opperation)

            new_lvl %= lcm

            if new_lvl % monkey.test == 0:
                new_monkey = monkey.condition_true
                monkeys[new_monkey].items.append(new_lvl)
            else:
                new_monkey = monkey.condition_false
                monkeys[new_monkey].items.append(new_lvl)

        monkey.items.clear()

    if r in [1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]:
        print(f"== After round {r} ==")
        for monkey in monkeys:
            print(f"Monkey {monkey.id}", monkey.monki_bsns)

for monkey in monkeys:
    print(f"Monkey {monkey.id}", monkey.items)

monkeys.sort(key=lambda x: x.monki_bsns, reverse=True)
for monkey in monkeys:
    print(f"Monkey {monkey.id}", monkey.monki_bsns)

print(monkeys[0].monki_bsns*monkeys[1].monki_bsns)
