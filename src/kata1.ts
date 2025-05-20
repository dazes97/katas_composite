// Kata 1: Sistema de Archivos Básico
// Problema
// Crea un sistema de archivos donde los archivos y carpetas puedan ser tratados de manera uniforme. Cada archivo tiene un tamaño, y cada carpeta puede contener archivos y otras carpetas. Calcula el tamaño total de una carpeta.

// Instrucciones
// Crea una interfaz FileSystemComponent con métodos getSize() y showDetails().
// Implementa una clase File que represente un archivo con un nombre y tamaño.
// Implementa una clase Folder que pueda contener múltiples FileSystemComponent.
// En el cliente, crea una estructura de carpetas y calcula el tamaño total.

export interface FileSystemComponent {
  getSize(): number;
  showDetails(indent?: string): void;
}

export class File implements FileSystemComponent {
  constructor(private name: string, private size: number) {}

  getSize(): number {
    return this.size;
  }

  showDetails(indent: string = ""): void {
    console.log(`${indent}Archivo: ${this.name}, Tamaño: ${this.size}KB`);
  }
}

export class Folder implements FileSystemComponent {
  private contents: FileSystemComponent[] = [];

  constructor(private name: string) {}

  add(component: FileSystemComponent): void {
    this.contents.push(component);
  }

  getSize(): number {
    return this.contents.reduce((total, item) => total + item.getSize(), 0);
  }

  showDetails(indent: string = ""): void {
    console.log(
      `${indent}Carpeta: ${this.name}, Tamaño Total: ${this.getSize()}KB`
    );
    this.contents.forEach((item) => item.showDetails(indent + "  "));
  }
}

const file1 = new File("file1.txt", 10);
const file2 = new File("file2.txt", 20);

const folder1 = new Folder("folder1");
folder1.add(file1);
folder1.add(file2);

folder1.showDetails();
