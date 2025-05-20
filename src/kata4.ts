// Kata 4: Sistema de Productos
// Problema
// Crea un sistema para representar productos y paquetes de productos. Cada producto tiene un nombre y un precio. Los paquetes pueden contener productos y otros paquetes.

// Instrucciones
// Crea una interfaz ProductComponent con métodos getPrice() y showDetails().
// Implementa una clase Product para productos individuales.
// Implementa una clase ProductPackage para paquetes de productos.
// En el cliente, crea una estructura de productos y paquetes y calcula el precio total.
// Salida Esperada
// Producto: Laptop, Precio: 1000
// Producto: Mouse, Precio: 50
// Paquete: Oficina, Precio Total: $1050

export interface ProductComponent {
  getPrice(): number;
  showDetails(indent?: string): void;
}

export class Product implements ProductComponent {
  constructor(private name: string, private price: number) {}

  getPrice(): number {
    return this.price;
  }

  showDetails(indent: string = ""): void {
    console.log(`${indent}Producto: ${this.name}, Precio: $${this.price}`);
  }
}

export class ProductPackage implements ProductComponent {
  private components: ProductComponent[] = [];

  constructor(private name: string) {}

  add(component: ProductComponent): void {
    this.components.push(component);
  }

  getPrice(): number {
    return this.components.reduce((total, comp) => total + comp.getPrice(), 0);
  }

  showDetails(indent: string = ""): void {
    console.log(
      `${indent}Paquete: ${this.name}, Precio Total: $${this.getPrice()}`
    );
    for (const component of this.components) {
      component.showDetails(indent + "  ");
    }
  }
}

const laptop = new Product("Laptop", 1000);
const mouse = new Product("Mouse", 50);
const teclado = new Product("Teclado", 70);

const oficina = new ProductPackage("Oficina");
oficina.add(laptop);
oficina.add(mouse);
oficina.add(teclado);

const monitor = new Product("Monitor", 300);
const trabajo = new ProductPackage("Trabajo Remoto");
trabajo.add(oficina);
trabajo.add(monitor);

trabajo.showDetails();
