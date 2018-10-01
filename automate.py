import os

components = ['bs-navbar', 'home', 'products', 'shopping-cart', 'check-out', 'order-success','my-orders','login']

for component in components:
    os.system("ng g c {}".format(component));
