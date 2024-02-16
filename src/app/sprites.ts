import { Juego } from "./juego";
import { TObjetoJuegoSprite } from "./objetoJuego";

export type TSprite = {
  nombre: string;
  ancho: number;
  alto: number;
  proporcion: number;
  x: number;
  y: number;
  modificadorVelocidad: number;
  frames: TObjetoJuegoSprite;
};

export function crearSprites(juego: Juego) {
  const spritesFondos: TSprite[] = [
    {
      nombre: "ciudad-1.png",
      ancho: 2400,
      alto: 720,
      proporcion: 1,
      x: 0,
      y: 0,
      modificadorVelocidad: 0.2,
      frames: { reposo: { posicion: 0, frames: 1 } },
    },
    {
      nombre: "ciudad-2.png",
      ancho: 2400,
      alto: 720,
      proporcion: 1,
      x: 0,
      y: 0,
      modificadorVelocidad: 0.4,
      frames: { reposo: { posicion: 0, frames: 1 } },
    },
    {
      nombre: "ciudad-3.png",
      ancho: 2400,
      alto: 720,
      proporcion: 1,
      x: 0,
      y: 0,
      modificadorVelocidad: 0.6,
      frames: { reposo: { posicion: 0, frames: 1 } },
    },
    {
      nombre: "ciudad-4.png",
      ancho: 2400,
      alto: 720,
      proporcion: 1,
      x: 0,
      y: -100,
      modificadorVelocidad: 0.8,
      frames: { reposo: { posicion: 0, frames: 1 } },
    },
    {
      nombre: "ciudad-5.png",
      ancho: 2400,
      alto: 720,
      proporcion: 1,
      x: 0,
      y: -185,
      modificadorVelocidad: 1,
      frames: { reposo: { posicion: 0, frames: 1 } },
    },
  ];
  const spritesJugador: TSprite[] = [
    {
      nombre: "shadow_dog.png",
      ancho: 575,
      alto: 523,
      proporcion: 0.3,
      x: 0,
      y: juego.alto,
      modificadorVelocidad: 0,
      frames: {
        reposo: { posicion: 0, frames: 7 },
        inicioSalto: { posicion: 1, frames: 7 },
        caidaSalto: { posicion: 2, frames: 7 },
        correr: { posicion: 3, frames: 9 },
        mareado: { posicion: 4, frames: 11 },
        sentado: { posicion: 5, frames: 5 },
        rollo: { posicion: 6, frames: 7 },
        mordida: { posicion: 7, frames: 7 },
        muerto: { posicion: 8, frames: 12 },
        golpeado: { posicion: 9, frames: 4 },
        golpeando: { posicion: 6, frames: 7 },
      },
    },
  ];
  const spritesEnemigos: TSprite[] = [
    {
      nombre: "murcielagoa.png",
      ancho: 293,
      alto: 155,
      proporcion: 0.333,
      x: Math.random() * juego.ancho,
      y: Math.random() * juego.alto,
      modificadorVelocidad: 0,
      frames: { volando: { posicion: 0, frames: 6 } },
    },
    {
      nombre: "murcielagob.png",
      ancho: 266,
      alto: 188,
      proporcion: 0.5,
      x: Math.random() * juego.ancho,
      y: Math.random() * juego.alto,
      modificadorVelocidad: 0,
      frames: { volando: { posicion: 0, frames: 6 } },
    },
    {
      nombre: "fantasmaa.png",
      ancho: 218,
      alto: 177,
      proporcion: 0.333,
      x: Math.random() * juego.ancho,
      y: Math.random() * juego.alto,
      modificadorVelocidad: 0,
      frames: { volando: { posicion: 0, frames: 6 } },
    },
    {
      nombre: "ruedita.png",
      ancho: 213,
      alto: 212,
      proporcion: 0.333,
      x: Math.random() * juego.ancho,
      y: Math.random() * juego.alto,
      modificadorVelocidad: 0,
      frames: { volando: { posicion: 0, frames: 9 } },
    },
    {
      nombre: "gusano.png",
      ancho: 229,
      alto: 171,
      proporcion: 0.4,
      x: Math.random() * juego.ancho,
      y: Math.random() * juego.alto,
      modificadorVelocidad: 0,
      frames: { corriendo: { posicion: 0, frames: 6 } },
    },
    {
      nombre: "cuervo.png",
      ancho: 271,
      alto: 194,
      proporcion: 1,
      x: 0,
      y: 0,
      modificadorVelocidad: 0,
      frames: { volando: { posicion: 0, frames: 6 } },
    },
    {
      nombre: "zombie.png",
      ancho: 292,
      alto: 410,
      proporcion: 1,
      x: 0,
      y: 0,
      modificadorVelocidad: 0,
      frames: { corriendo: { posicion: 0, frames: 6 } },
    },
  ];
  const spritesExplosion: TSprite[] = [
    {
      nombre: "boom.png",
      ancho: 200,
      alto: 179,
      proporcion: 0.5,
      x: 0,
      y: 0,
      modificadorVelocidad: 0,
      frames: { explosion: { posicion: 0, frames: 5 } },
    },
  ];
  const spriteVidas: TSprite[] = [
    {
      nombre: "vidaperrito.png",
      ancho: 50,
      alto: 50,
      proporcion: 0.75,
      x: 0,
      y: 0,
      modificadorVelocidad: 0,
      frames: { vidas: { posicion: 0, frames: 1 } },
    },
  ];
  return [
    spritesFondos,
    spritesJugador,
    spritesEnemigos,
    spritesExplosion,
    spriteVidas,
  ];
}
