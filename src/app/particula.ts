import { Juego } from "./juego";
import { ObjetoJuego } from "./objetoJuego";

export class Particula extends ObjetoJuego {
  actualizar(deltaTiempo?: number | undefined): void {
    this.x -= this.velocidadX + this.juego.parametrosJuego.velocidadJuego;
    this.y -= this.velocidadY;
    this.radio *= 0.95;
    if (this.radio < 0.5) this.borrar = true;
  }

  dibujarParticula(ctx: CanvasRenderingContext2D) {}
}

export class Polvo extends Particula {
  constructor(juego: Juego, x: number, y: number) {
    super(juego, x, y);
    this.radio = Math.random() * 10 + 10;
    this.velocidadX = Math.random();
    this.velocidadY = Math.random();
    this.color = "rgba(0,0,0,0.3)";
  }

  dibujarParticula(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
    ctx.fill();
    //ctx.stroke();
    ctx.restore();
  }
}

export class Splash extends Particula {
  gravedad: number = 0;

  constructor(juego: Juego, x: number, y: number) {
    super(juego, x, y);
    this.radio = Math.floor(Math.random() * 100 + 100);
    this.x = this.x - this.radio * 0.4;
    this.y = this.y - this.radio * 0.5;
    this.velocidadX = Math.random() * 6 - 3;
    this.velocidadY = Math.random() * 2 + 1;
    this.imagen.src = "fuego.png";
  }

  actualizar(deltaTiempo?: number | undefined): void {
    super.actualizar(deltaTiempo);
    this.gravedad += 0.1;
    this.y += this.gravedad;
  }

  dibujarParticula(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.drawImage(
      this.imagen as CanvasImageSource,
      this.x,
      this.y,
      this.radio,
      this.radio
    );
    ctx.restore();
  }
}

export class Llama extends Particula {
  constructor(juego: Juego, x: number, y: number) {
    super(juego, x, y);
    this.radio = Math.random() * 100 + 70;
    this.velocidadX = 1;
    this.velocidadY = 1;
    this.angulo = 0;
    this.velocidadAngulo = Math.random() * 0.2 - 0.1;
    this.imagen.src = "fuego.png";
  }

  actualizar(deltaTiempo?: number | undefined): void {
    super.actualizar(deltaTiempo);
    this.angulo += this.velocidadAngulo;
    this.x += Math.sin(this.angulo * 5);
    // console.log("angulo " + this.angulo);
    // console.log("x " + this.x);
  }
  dibujarParticula(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angulo);
    ctx.drawImage(
      this.imagen as CanvasImageSource,
      -this.radio * 0.5,
      -this.radio * 0.5,
      this.radio,
      this.radio
    );
    ctx.restore();
  }
}
