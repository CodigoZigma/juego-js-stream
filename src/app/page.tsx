"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TParametrosJuego, TParametrosJugador } from "./juego";
import { Tecla } from "./inputHanlder";
import { useJuego } from "./hooks/useJuego";

export type TDimensiones = {
  ancho: number;
  alto: number;
};

const parametrosJugadorIni: TParametrosJugador = {
  estado: "",
  velocidadX: 10,
  velocidadY: 30,
  velocidadRX: 15,
  caidaGolpe: 35,
  velocidadFS: 10,
  velocidadFC: 10,
  velocidadFR: 10,
  velocidadFG: 10,
  peso: 2,
  framesLimite: 1,
};

const parametrosJuegoIni: TParametrosJuego = {
  FPS: 30,
  velocidadJuego: 5,
};

export default function Home() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasColision = useRef<HTMLCanvasElement>(null);
  const canvasDebug = useRef<HTMLCanvasElement>(null);

  const [dimensiones, setDimensiones] = useState<TDimensiones>({
    ancho: 0,
    alto: 0,
  });

  const [parametrosJuego, setParametrosJuego] = useState<TParametrosJuego>({
    ...parametrosJuegoIni,
  });
  const [parametrosJugador, setParametrosJugador] =
    useState<TParametrosJugador>({ ...parametrosJugadorIni });

  const [juego, setJuego, setCanvas, iniciarJuego] = useJuego(
    parametrosJuego,
    parametrosJugador
  );

  useEffect(() => {
    if (canvas.current && canvasColision.current && canvasDebug.current) {
      redimensionarCanvas([
        canvas.current,
        canvasColision.current,
        canvasDebug.current,
      ]);

      console.log("INICIO");
      setCanvas([
        ...[canvas.current, canvasColision.current, canvasDebug.current],
      ]);
    }
  }, []);

  const reiniciar = (e: KeyboardEvent) => {
    if (e.key === Tecla.REINICIAR) {
      console.log("REINICIO");
      iniciarJuego();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", reiniciar);
    return () => {
      window.removeEventListener("keydown", reiniciar);
    };
  });

  useEffect(() => {
    if (juego && !juego.gameOver) {
      setJuego((juegoEnCurso) => {
        if (juegoEnCurso) {
          juegoEnCurso.parametrosJugador = { ...parametrosJugador };
          juegoEnCurso.parametrosJuego = { ...parametrosJuego };
          juegoEnCurso.actualizarFramesLimiteJugador();
          juegoEnCurso.actualizarIntervalo();
        }
        return juegoEnCurso;
      });
    }
  }, [parametrosJuego, parametrosJugador]);

  const onChangeJugador = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setParametrosJugador({
      ...parametrosJugador,
      [e.target.name]:
        e.target.type === "range" ? parseInt(e.target.value) : e.target.value,
    });
  };

  const onChangeJuego = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setParametrosJuego({
      ...parametrosJuego,
      [e.target.name]:
        e.target.type === "range" ? parseInt(e.target.value) : e.target.value,
    });
  };

  return (
    <main className="container flex flex-col h-full min-h-screen bg-slate-900">
      <header className="container flex shrink-0 h-24 min-h-24 max-h-24 bg-white border-y-2 border-x-2 border-collapse border-black justify-center">
        <div className="relative flex flex-row grow justify-center bg-white">
          <div className="flex grow bg-slate-400 blur-md "></div>
          <p className="font-creepster text-[50px] text-gray-100 text-center absolute top-1/2 left-1/2 transform: -translate-x-1/2 -translate-y-1/2  z-10">
            EL laboratorio de José
          </p>
        </div>
      </header>
      <main className="container grow flex flex-row justify-between">
        <aside className="shrink flex flex-col justify-center align-middle  bg-slate-100 px-0 h-[535px] max-h-full border-l-2 border-r-0 border-x-2 border-collapse border-black">
          <div className="flex flex-col w-full max-w-full grow px-8 font-banger">
            <label htmlFor="estado">Estado:</label>
            <select
              className="rounded font-bold text-sm"
              value={parametrosJugador.estado}
              onChange={onChangeJugador}
              name="estado"
              id="estado"
            >
              {/* {juego?.spritesJugador[0].frames.map((animacion) => (
                <option key={animacion.nombre} value={animacion.nombre}>
                  {animacion.nombre}
                </option>
              ))} */}
            </select>
            <label htmlFor="FPS">FPS:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="120"
              value={parametrosJuego.FPS}
              name="FPS"
              id="FPS"
              onChange={onChangeJuego}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJuego.FPS}
              readOnly
            />
            <label htmlFor="escena">Escena:</label>
            <input
              type="range"
              className="text-sm"
              min="1"
              max="2"
              value="1"
              name="escena"
              id="escena"
              readOnly
            />
            <input type="text" className="text-sm" value="1" readOnly />
            {/* <label htmlFor="Velocidad">Velocidad:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={velocidadJuego}
              name="Velocidad"
              id="Velocidad"
              onChange={(e) =>
                setVelocidadJuego(Number.parseInt(e.target.value))
              }
            ></input>
            <input
              type="text"
              className="text-sm"
              value={velocidadJuego}
              readOnly
            /> */}

            <label htmlFor="peso">Peso:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="10"
              value={parametrosJugador.peso}
              name="peso"
              id="peso"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.peso}
              readOnly
            />

            <label htmlFor="caidaGolpe">Caida Golpe:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={parametrosJugador.caidaGolpe}
              name="caidaGolpe"
              id="caidaGolpe"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.caidaGolpe}
              readOnly
            />
            <label htmlFor="framesLimite">Frames Limite:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="10"
              value={parametrosJugador.framesLimite}
              name="framesLimite"
              id="framesLimite"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.framesLimite}
              readOnly
            />
          </div>
        </aside>
        <main className="flex flex-1 flex-row justify-center bg-stone-100 shrink">
          <div className="relative flex flex-row w-full bg-black border-x-2 border-collapse border-black">
            <canvas
              id="lienzo"
              className="absolute top-0 left-0 w-full h-[720px] max-w-full max-h-full flex bg-slate-500  "
              ref={canvas}
            ></canvas>
            <canvas
              id="lienzoColision"
              className="absolute top-0 left-0 w-full h-[720px] max-w-full max-h-full flex opacity-0"
              ref={canvasColision}
            ></canvas>
            <canvas
              id="lienzoDebug"
              className="absolute top-0 left-0 w-full h-[720px] max-w-full max-h-full flex"
              ref={canvasDebug}
            ></canvas>
          </div>
        </main>
        <aside className="shrink flex flex-col justify-center align-middle  bg-slate-100 px-2 h-[535px] max-h-full border-l-0 border-r-2 border-x-2 border-collapse border-black">
          <div className="flex flex-col w-full max-w-full grow px-8 font-banger">
            <label htmlFor="velocidadX" className="">
              VelocidadX:
            </label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={parametrosJugador.velocidadX}
              name="velocidadX"
              id="velocidadX"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.velocidadX}
              readOnly
            />
            <label htmlFor="velocidadY">VelocidadY:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={parametrosJugador.velocidadY}
              name="velocidadY"
              id="velocidadY"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.velocidadY}
              readOnly
            />
            <label htmlFor="velocidadRX">VelocidadRX:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={parametrosJugador.velocidadRX}
              name="velocidadRX"
              id="velocidadRX"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.velocidadRX}
              readOnly
            />
            <label htmlFor="velocidadFC">velocidadFC:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={parametrosJugador.velocidadFC}
              name="velocidadFC"
              id="velocidadFC"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.velocidadFC}
              readOnly
            />
            <label htmlFor="velocidadFR">VelocidadFR:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={parametrosJugador.velocidadFR}
              name="velocidadFR"
              id="velocidadFR"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.velocidadFR}
              readOnly
            />
            <label htmlFor="velocidadFG">VelocidadFG:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={parametrosJugador.velocidadFG}
              name="velocidadFG"
              id="velocidadFG"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.velocidadFG}
              readOnly
            />

            <label htmlFor="velocidadFS">VelocidadFS:</label>
            <input
              type="range"
              className="text-sm"
              min="0"
              max="50"
              value={parametrosJugador.velocidadFS}
              name="velocidadFS"
              id="velocidadFS"
              onChange={onChangeJugador}
            ></input>
            <input
              type="text"
              className="text-sm"
              value={parametrosJugador.velocidadFS}
              readOnly
            />
          </div>
        </aside>
      </main>

      <footer className="container flex shrink-0 h-16 min-h-16 max-h-16 bg-slate-100 border-y-2 border-x-2 border-collapse border-black"></footer>
    </main>
  );
}

const redimensionarCanvas = (canvas: Array<HTMLCanvasElement>) => {
  canvas.forEach((lienzo) => {
    resizeCanvasToDisplaySize(lienzo);
  });
};

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

const obtenerTamVentana = () => {
  const { innerWidth, innerHeight } = window;
  const ancho = innerWidth;
  const alto = innerHeight;
  return { ancho, alto };
};
