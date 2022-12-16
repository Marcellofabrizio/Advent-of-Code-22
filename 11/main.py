import math
INPUT = "input.txt"


class Monkey():
    def __init__(self, index, items_input, operation_input, test_input, condition_input_true, condition_input_false):
        self.id = index
        self.items = parse_items_input(items_input)
        self.operation, self.worry_lvl = parse_operation_input(operation_input)
        self.test = parse_test_input(test_input)
        self.condition_true = parse_condition_input(condition_input_true)
        self.condition_false = parse_condition_input(condition_input_false)
        self.monki_bsns = 0


def parse_items_input(input):
    items = input.split(": ")[1].split(", ")
    return items


def parse_operation_input(input):
    operation = input.split("= ")[1].split(" ")[1]
    worry_lvl = input.split("= ")[1].split(" ")[2]
    operation_func = None

    if operation == "*":
        def operation_func(x, y): return x*y
    elif operation == "+":
        def operation_func(x, y): return x+y
    elif operation == "-":
        def operation_func(x, y): return x-y

    return (operation_func, worry_lvl)


def parse_test_input(input):
    return int(input.split("by ")[1])


def parse_condition_input(input):
    return int(input.split("monkey ")[1])


def read_input():
    input = [line.strip() for line in open(INPUT)]
    return input


input = read_input()
print(input, int(len(input)/6))
monkey_index = 0

monkeys = [Monkey(0, input[1], input[2], input[3], input[4], input[5])]
monkey_index += 1
for i in range(5, len(input)):
    if input[i] == "":
        i += 1
        monkeys.append(
            Monkey(monkey_index, input[i+1], input[i+2], input[i+3], input[i+4], input[i+5]))
        monkey_index += 1

for _ in range(0, 20):
    for monkey in monkeys:
        print(f"Monkey {monkey.id}")
        old_list = monkey.items.copy()
        for i, item in enumerate(monkey.items):
            print(f"  Monkey inspects an item with a worry level of {item}")
            monkey.monki_bsns += 1
            if monkey.worry_lvl == "old":
                new_lvl = monkey.operation(int(item), int(item))
            else:
                new_lvl = monkey.operation(int(item), int(monkey.worry_lvl))
            print(f"    Worry level is multiplied by {monkey.worry_lvl} to {new_lvl}")
    
            division = math.floor(new_lvl / 3)
            print(f"    Monkey gets bored with item. Worry level is divided by 3 to {division}")
    
            if division % monkey.test == 0:
                print(f"    Current worry level is divisible by {monkey.test}")
                new_monkey = monkey.condition_true
                print(f"    Item with worry level {division} is throw to monkey {new_monkey}")
                monkeys[new_monkey].items.append(division)
                old_list.remove(item)
            else:
                print(f"    Current worry level is not divisible by {monkey.test}")
                new_monkey = monkey.condition_false
                print(f"    Item with worry level {division} is throw to monkey {new_monkey}")
                monkeys[new_monkey].items.append(division)
                old_list.remove(item)
    
        monkey.items = old_list
    
for monkey in monkeys:
    print(f"Monkey {monkey.id}", monkey.items)

monkeys.sort(key = lambda x : x.monki_bsns, reverse=True)
for monkey in monkeys:
    print(f"Monkey {monkey.id}", monkey.monki_bsns)

print(monkeys[0].monki_bsns*monkeys[1].monki_bsns)
