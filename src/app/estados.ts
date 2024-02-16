import { ManejadorEntrada } from "./inputHanlder";
import { ObjetoJuego, TFrame, TObjetoJuegoSprite } from "./objetoJuego";

export class Estado {
  nombre: string;
  sprite: TFrame;
  velocidadFondo: number = -1;

  constructor(
    nombre: string,
    sprite: TFrame,
    velocidadFondo?: number,
    entrar?: (objetoJuego: ObjetoJuego) => void,
    manejarEntrada?: (
      objetoJuego: ObjetoJuego,
      entrada: ManejadorEntrada
    ) => void
  ) {
    this.nombre = nombre;
    this.sprite = sprite;
    if (entrar) this.entrar = entrar;
    if (manejarEntrada) this.manejarEntrada = manejarEntrada;
    if (velocidadFondo != undefined && velocidadFondo > -1)
      this.velocidadFondo = velocidadFondo;
  }

  entrar(objetoJuego: ObjetoJuego): void {}

  manejarEntrada(objetoJuego: ObjetoJuego, entrada: ManejadorEntrada): void {}
}

export type TEstados = {
  [nombre: string]: Estado;
};

export class Estados {
  sprites: TObjetoJuegoSprite = {};
  estados: TEstados = {};

  constructor(sprites: TObjetoJuegoSprite) {
    this.sprites = sprites;
  }
  // for (const sprite in this.sprites) {
  //   this.estados[sprite] = new Estado(sprite, this.sprites[sprite]);
  // }

  crearEstado(
    nombre: string,
    velocidadFondo?: number,
    entrar?: (objetoJuego: ObjetoJuego) => void,
    manejarEntrada?: (
      objetoJuego: ObjetoJuego,
      entrada: ManejadorEntrada
    ) => void
  ) {
    this.estados[nombre] = new Estado(
      nombre,
      this.sprites[nombre],
      velocidadFondo,
      entrar,
      manejarEntrada
    );
  }

  agregarEstado(nombre: string, estado: Estado) {
    this.estados[nombre] = estado;
  }

  obtenerEstado(nombreEstado: string) {
    return this.estados[nombreEstado];
  }

  estadoInicial() {
    return Object.values(this.estados)[0];
  }
}
