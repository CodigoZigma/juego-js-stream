"use client";
import { useEffect, useRef, useState } from "react";
import { ObjetoJuego, TObjetoJuegoSprite } from "./objetoJuego";

export type TDimensiones = {
  ancho: number;
  alto: number;
};

const anchoSprites = 575;
const altoSprites = 523;
const animacionSprites: TObjetoJuegoSprite[] = [
  { nombre: "reposo", posicion: 0, frames: 7 },
  { nombre: "inicio-salto", posicion: 1, frames: 7 },
  { nombre: "caida-salto", posicion: 2, frames: 7 },
  { nombre: "correr", posicion: 3, frames: 9 },
  { nombre: "mareado", posicion: 4, frames: 9 },
  { nombre: "sentado", posicion: 5, frames: 5 },
  { nombre: "rollo", posicion: 6, frames: 7 },
  { nombre: "mordida", posicion: 7, frames: 7 },
  { nombre: "muerto", posicion: 8, frames: 12 },
  { nombre: "golpeado", posicion: 9, frames: 4 },
];

export default function Home() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [personaje, setPersonaje] = useState<ObjetoJuego | null>(null);
  const [dimensiones, setDimensiones] = useState<TDimensiones>({
    ancho: 0,
    alto: 0,
  });

  const [estadoPersonaje, setEstadoPersonaje] = useState("");

  useEffect(() => {
    if (canvas.current) {
      resizeCanvasToDisplaySize(canvas.current);
      const ancho = canvas.current?.width;
      const alto = canvas.current?.height;
      setDimensiones({ ancho: ancho, alto: alto });
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (dimensiones.ancho != 0 && dimensiones.alto != 0) {
      const imagen = document.createElement("img");
      imagen.src = "shadow_dog.png";
      let objetoJuego = new ObjetoJuego(
        dimensiones.ancho * 0.5,
        dimensiones.alto * 0.5,
        30,
        imagen,
        anchoSprites,
        altoSprites,
        anchoSprites,
        altoSprites,
        30,
        0,
        0,
        animacionSprites
      );
      setPersonaje(objetoJuego);
      setEstadoPersonaje(animacionSprites[0].nombre);
    }
  }, [dimensiones]);

  useEffect(() => {
    if (personaje) {
      const objetosJuego: ObjetoJuego[] = [];
      const maxPersonajes = 10;
      const framesJuego = 10;
      let contaFrames = 0;
      const ctx = canvas.current?.getContext("2d");
      const estado = personaje.estado(estadoPersonaje);
      personaje.frameY = estado?.posicion || 0;
      console.log("hola");
      const animacion = (tiempo: number) => {
        if (ctx) {
          ctx.clearRect(0, 0, dimensiones.ancho, dimensiones.alto);
          if (personaje.sprites.length > 0) {
            if (estado && estado.frames > 0)
              personaje.frameX =
                Math.floor(contaFrames / framesJuego) % estado.frames;
            personaje.dibujar(ctx, true);
          }
        } else {
        }
        // if (contaFrames % framesJuego == 0) {
        //   if (objetosJuego[0].frameX < objetosJuego[0].maxFrames)
        //     objetosJuego[0].frameX++;
        //   else objetosJuego[0].frameX = 0;
        // }
        contaFrames++;
        let ultimoTiempo = requestAnimationFrame(animacion);
      };
      animacion(0);
    }

    return () => {};
  }, [personaje, estadoPersonaje, dimensiones.alto, dimensiones.ancho]);

  return (
    <main className="container flex flex-col h-screen min-h-screen bg-slate-900">
      <header className="container flex h-24 min-h-24 bg-emerald-500"></header>
      <main className="grow container flex flex-row">
        <aside className="flex flex-col justify-center align-middle w-1/5  bg-green-100 px-8">
          <div className="px-4">
            <select
              className="rounded font-bold"
              value={estadoPersonaje}
              onChange={(e) => setEstadoPersonaje(e.target.value)}
            >
              {animacionSprites.map((animacion) => (
                <option key={animacion.nombre} value={animacion.nombre}>
                  {animacion.nombre}
                </option>
              ))}
            </select>
          </div>
        </aside>
        <main className="flex grow bg-white">
          <canvas id="lienzo" className="bg-white" ref={canvas}></canvas>
        </main>
      </main>
      <footer className="container flex h-16 min-h-16 bg-emerald-800"></footer>
    </main>
  );
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
  // const dpr = window.devicePixelRatio;
  // const displayWidth = Math.round(canvas.clientWidth * dpr);
  // const displayHeight = Math.round(canvas.clientHeight * dpr);

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width != displayWidth || canvas.height != displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}
