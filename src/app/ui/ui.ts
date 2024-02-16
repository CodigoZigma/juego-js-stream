import { Juego } from "../juego";

export class UI {
  juego: Juego;
  fontSize: number;
  fontFamily: string;

  constructor(juego: Juego) {
    this.juego = juego;
    this.fontSize = 30;
    this.fontFamily = "Bangers";
  }

  dibujarPuntaje(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = this.fontSize + "px " + this.fontFamily;
    ctx.textAlign = "left";
    ctx.fillStyle = this.juego.colorFuente;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 0;
    ctx.font = "35px " + this.fontFamily;
    ctx.fillStyle = "black";
    ctx.fillText("Puntos: " + this.juego.puntaje, 10, 50);
    ctx.fillText("Tiempo: " + (this.juego.tiempo * 0.001).toFixed(1), 150, 50);
    //ctx.fillText("Vidas: ", 320, 50);
    for (let i = 0; i < this.juego.vidas; i++) {
      ctx.drawImage(
        this.juego.vida.img,
        320 + i * this.juego.vida.ancho * 0.75,
        17.5,
        this.juego.vida.ancho * this.juego.vida.proporcion,
        this.juego.vida.alto * this.juego.vida.proporcion
      );
    }
    ctx.fillText("Energía: ", 530, 50);
    if (this.juego.jugador) {
      ctx.strokeRect(640, 17.5, 100, 40);
      ctx.fillRect(
        640,
        17.5,
        Number.parseInt(
          (
            (this.juego.jugador?.energia / this.juego.jugador?.maxEnergia) *
            100
          ).toFixed(0)
        ),
        40
      );
    }
    ctx.restore();
  }

  dibujarGameOver(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 0;
    ctx.font = "40px " + this.fontFamily;
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    // ctx.fillText(
    //   "GAME OVER. Tu puntaje es: " + this.juego.puntaje,
    //   this.juego.ancho * 0.5,
    //   this.juego.alto * 0.5
    // );
    // ctx.fillStyle = "white";
    if (this.juego.vidas <= 0) {
      ctx.font = "40px Creepster";
      ctx.fillText(
        "Vuelve de ultratumba. Tu puntaje es: " + this.juego.puntaje,
        this.juego.ancho * 0.5 + 5,
        this.juego.alto * 0.5 + 5
      );
    } else {
      ctx.fillText(
        "¡Parece que te tomas tu tiempo!",
        this.juego.ancho * 0.5 + 5,
        this.juego.alto * 0.5 - 45
      );
      ctx.fillText(
        "Tu puntaje es: " + this.juego.puntaje,
        this.juego.ancho * 0.5 + 5,
        this.juego.alto * 0.5
      );
    }
    ctx.fillText(
      "Presiona R para reiniciar. ¡Vamos!",
      this.juego.ancho * 0.5 + 5,
      this.juego.alto * 0.5 + 45
    );

    ctx.restore();
  }

  dibujar(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.juego.colorFuente;
    ctx.fillText("Puntaje: " + this.juego.puntaje, 0, 0);
    ctx.restore();
  }
}
