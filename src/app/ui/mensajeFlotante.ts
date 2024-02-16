import { Juego } from "../juego";
import { ObjetoJuego } from "../objetoJuego";

export class MensajeFlotante extends ObjetoJuego {
  mensaje: string;
  objetivoX: number;
  reloj: number;
  objetivoY: number;
  constructor(
    juego: Juego,
    mensaje: string,
    x: number,
    y: number,
    objetivoX: number,
    objetivoY: number
  ) {
    super(juego, x, y);
    this.mensaje = mensaje;
    this.objetivoX = objetivoX;
    this.objetivoY = objetivoY;
    this.reloj = 0;
  }

  crearEstados() {
    this.estadosObjeto.crearEstado("mensaje");
  }

  actualizar() {
    this.x += (this.objetivoX - this.x) * 0.03;
    this.y += (this.objetivoY - this.y) * 0.03;
    this.reloj++;
    if (this.reloj > 100) this.borrar = true;
  }

  dibujar(ctx: CanvasRenderingContext2D) {
    ctx.font = "20px Creepster";
    ctx.fillStyle = "white";
    ctx.fillText(this.mensaje, this.x, this.y);
    ctx.fillStyle = "black";
    ctx.fillText(this.mensaje, this.x - 2, this.y - 2);
  }
}
