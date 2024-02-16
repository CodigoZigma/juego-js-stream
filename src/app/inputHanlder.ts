import { Juego } from "./juego";

export enum Tecla {
  ARRIBA = "ArrowUp",
  ABAJO = "ArrowDown",
  IZQUIERDA = "ArrowLeft",
  DERECHA = "ArrowRight",
  ROLLO = " ",
  DEBUG = "d",
  REINICIAR = "r",
}

export class ManejadorEntrada {
  keys: string[];
  teclas: String[];
  juego: Juego;

  constructor(juego: Juego) {
    this.juego = juego;
    this.teclas = [
      Tecla.ARRIBA,
      Tecla.ABAJO,
      Tecla.IZQUIERDA,
      Tecla.DERECHA,
      Tecla.ROLLO,
    ];
    this.keys = [];
  }

  capturarEntrada = (e: KeyboardEvent) => {
    if (!this.keys.includes(e.key) && this.teclas.includes(e.key)) {
      this.keys.push(e.key);
    } else if (e.key === Tecla.DEBUG) {
      this.juego.debug = !this.juego.debug;
    }
  };

  capturarSalida = (e: KeyboardEvent) => {
    if (this.keys.includes(e.key) && this.teclas.includes(e.key)) {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
  };
}
