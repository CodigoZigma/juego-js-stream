"use client";
import { useState, useEffect, useRef } from "react";
import { Juego, TParametrosJuego, TParametrosJugador } from "../juego";
import React from "react";

type Props = [
  juego: Juego | null,
  setJuego: React.Dispatch<React.SetStateAction<Juego | null>>,
  setCanvas: React.Dispatch<React.SetStateAction<Array<HTMLCanvasElement>>>,
  iniciarJuego: () => void
];
export const useJuego = (
  parametrosJuego: TParametrosJuego,
  parametrosJugador: TParametrosJugador
): Props => {
  const [juego, setJuego] = useState<Juego | null>(null);
  const [canvas, setCanvas] = useState<Array<HTMLCanvasElement>>([]);
  const Id = useRef<number>(0);

  useEffect(() => {
    if (canvas.length != 0) iniciarJuego();
  }, [canvas]);

  useEffect(() => {
    if (juego) {
      let ultimoTiempo: number = 0;
      const animacion = (tiempo: number) => {
        // const ahora = window.performance.now();
        // const deltaTiempo = ahora - ultimoTiempo;
        // console.log("t " + tiempo);
        const deltaTiempo =
          Math.round((tiempo - ultimoTiempo + Number.EPSILON) * 100) / 100;
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

  const iniciarJuego = () => {
    setJuego(
      new Juego(
        canvas,
        { ...parametrosJuego },
        { ...parametrosJugador },
        [5, 6, 4, 10, 6]
      )
    );
  };

  return [juego, setJuego, setCanvas, iniciarJuego];
};

/*



*/
