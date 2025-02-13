"use client";
import { useState, useEffect, useRef } from "react";
import { Juego, TParametrosJuego, TParametrosJugador } from "../juego";
import React from "react";

type Props = [
  juego: Juego | null,
  setJuego: React.Dispatch<React.SetStateAction<Juego | null>>,
  setCanvas: React.Dispatch<React.SetStateAction<Array<HTMLCanvasElement>>>,
  iniciarJuego: (
    parametrosJuego: TParametrosJuego,
    parametrosJugador: TParametrosJugador
  ) => void
];
export const useJuego = (
  parametrosJuego: TParametrosJuego,
  parametrosJugador: TParametrosJugador
): Props => {
  const [juego, setJuego] = useState<Juego | null>(null);
  const [canvas, setCanvas] = useState<Array<HTMLCanvasElement>>([]);
  const Id = useRef<number>(0);

  useEffect(() => {
    if (canvas.length != 0) iniciarJuego(parametrosJuego, parametrosJugador);
  }, [canvas]);

  useEffect(() => {
    if (juego) {
      let ultimoTiempo: number = 0;
      const animacion = (tiempo: number) => {
        // const ahora = window.performance.now();
        // const deltaTiempo = ahora - ultimoTiempo;
        // console.log("t " + tiempo);
        const deltaTiempo = tiempo - ultimoTiempo;
        //console.log("delta: " + deltaTiempo);

        ultimoTiempo = tiempo;
        // if (deltaTiempo < juego.intervalo) return;
        juego?.renderizar(deltaTiempo, false);

        if (!juego?.gameOver) {
          Id.current = requestAnimationFrame(animacion);
        }
      };

      console.log("Inicio Animación. Renderizando.");
      animacion(0);
    }
    return () => {
      if (Id.current) cancelAnimationFrame(Id.current);
    };
  }, [juego]);

  const iniciarJuego = (
    parametrosJuego: TParametrosJuego,
    parametrosJugador: TParametrosJugador
  ) => {
    setJuego(crearJuego(parametrosJuego, parametrosJugador));
  };

  const crearJuego = (
    parametrosJuego: TParametrosJuego,
    parametrosJugador: TParametrosJugador
  ) => {
    const [canvasFondo, canvasColision, canvasDebug] = canvas;
    const ctxFondo: CanvasRenderingContext2D | null =
      canvasFondo.getContext("2d");

    const ctxColision: CanvasRenderingContext2D | null =
      canvasColision.getContext("2d", {
        willReadFrequently: true,
      });

    const ctxDebug: CanvasRenderingContext2D | null =
      canvasDebug.getContext("2d");

    const ancho = canvasFondo.width;
    const alto = canvasFondo.height;

    if (ctxFondo && ctxColision && ctxDebug) {
      return new Juego(
        ctxFondo,
        ctxDebug,
        ctxColision,
        ancho,
        alto,
        { ...parametrosJuego },
        { ...parametrosJugador },
        [5, 6, 4, 10, 6],
        canvasFondo.getBoundingClientRect()
      );
    }

    throw new Error("no se pudo crear el contexto");
  };

  return [juego, setJuego, setCanvas, iniciarJuego];
};

/*



*/
