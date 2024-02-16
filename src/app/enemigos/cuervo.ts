import { ManejadorEntrada } from "../inputHanlder";
import { Juego } from "../juego";
import { ObjetoJuego, TObjetoJuegoSprite } from "../objetoJuego";

export class Cuervo extends ObjetoJuego {
  constructor(
    juego: Juego,
    imagen: string,
    anchoSprite: number,
    altoSprite: number,
    proporcion: number,
    margenSprite: number,
    sprites: TObjetoJuegoSprite,
    estadoActual: string
  ) {
    super(
      juego,
      0,
      0,
      0,
      imagen,
      anchoSprite,
      altoSprite,
      proporcion,
      margenSprite,
      0,
      0,
      sprites,
      estadoActual
    );
    this.modificarProporcion(Math.random() * 1 + 0.2);
    this.y = Math.random() * (juego.alto - this.alto);
    this.x = juego.ancho;
    this.velocidadX = Math.random() * 5 + 3;
    this.velocidadY = Math.random() * 5 - 2.5;
    this.modificadorVelocidad = Math.floor(Math.random() * 3 + 1);
    this.crearColoresAleatorios();
  }

  crearEstados() {
    this.estadosObjeto.crearEstado("volando");
  }

  actualizar(deltaTiempo?: number | undefined): void {
    if (this.y <= 0 || this.y >= this.juego.alto - this.alto) {
      this.velocidadY = this.velocidadY * -1;
    }
    this.x -= this.velocidadX * 0.7;
    this.y += this.velocidadY;
    if (this.x < -this.ancho) {
      this.borrar = true;
      //juego.gameOver = true;
    }
    super.actualizar();
  }
}
