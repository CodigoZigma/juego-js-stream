import { copyFileSync } from "fs";
import { Juego } from "./juego";
import { ObjetoJuego } from "./objetoJuego";

export class Explosion extends ObjetoJuego {
  crearEstados() {
    this.estadosObjeto.crearEstado("explosion");
  }

  actualizar(deltaTiempo?: number | undefined): void {
    //if (this.frameX === 0 && this.sonido) this.sonido.play();
    this.frameX = this.framesLimite;
    if (this.frameX === (this.estado?.sprite?.frames || 1) - 1)
      this.borrar = true;
    if (this.juego.contaFrames % 3 === 0) this.framesLimite++;
    this.frameY = this.estado?.sprite?.posicion || 0;
  }

  /*   eliminar(juego: Juego): void {
    juego.explosiones.shift();
  } */
}
