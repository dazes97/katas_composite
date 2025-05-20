// Kata 2: Menú de Restaurante
// Problema
// Crea un sistema para representar un menú de restaurante. Cada elemento del menú tiene un nombre y un precio. Los menús pueden contener submenús y elementos individuales.

// Instrucciones
// Crea una interfaz MenuComponent con métodos getPrice() y showDetails().
// Implementa una clase MenuItem para representar un elemento individual.
// Implementa una clase Menu para representar un menú que contenga otros MenuComponent.
// En el cliente, crea un menú con submenús y calcula el precio total.

export interface MenuComponent {
  getPrice(): number;
  showDetails(indent?: string): void;
}

export class MenuItem implements MenuComponent {
  constructor(private name: string, private price: number) {}

  getPrice(): number {
    return this.price;
  }

  showDetails(indent: string = ""): void {
    console.log(`${indent}Elemento: ${this.name}, Precio: $${this.price}`);
  }
}

export class Menu implements MenuComponent {
  private items: MenuComponent[] = [];

  constructor(private name: string) {}

  add(item: MenuComponent): void {
    this.items.push(item);
  }

  getPrice(): number {
    return this.items.reduce((total, item) => total + item.getPrice(), 0);
  }

  showDetails(indent: string = ""): void {
    console.log(
      `${indent}Menú: ${this.name}, Precio Total: $${this.getPrice()}`
    );
    this.items.forEach((item) => item.showDetails(indent + "  "));
  }
}
const pizza = new MenuItem("Pizza", 10);
const salad = new MenuItem("Ensalada", 5);

const lunchMenu = new Menu("Almuerzo");
lunchMenu.add(pizza);
lunchMenu.add(salad);

lunchMenu.showDetails();
