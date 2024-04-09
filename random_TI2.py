import random


# Inisialisasi dictionary
initiating = {}
planning = {}
executing = {}
monitoring = {}
closing = {}
lists = []

# Generate 77 random values
for key in range(5,9):
    initiating[key] = random.randint(1, 5)
lists.append(initiating)

for key in range(10, 28):
    planning[key] = random.randint(1, 5)
lists.append(planning)

for key in range(29, 68):
    executing[key] = random.randint(1, 5)
lists.append(executing)

for key in range(69, 81):
    monitoring[key] = random.randint(1, 5)
lists.append(monitoring)

for key in range(82, 86):
    closing[key] = random.randint(1, 5)
lists.append(closing)

# Hitung total nilai dalam dictionary
total = 0

for suma in lists:
    total += sum(suma.values())

# Sesuaikan salah satu nilai agar totalnya menjadi 365
choices = random.choice(lists)
keyss = random.choice(list(choices.keys()))
choices[keyss] += 365 - total



print("Dictionary:")
for dict in lists:
    print(dict)
