import { Estado, Estados } from "./estados";
import { Juego } from "./juego";

export type TObjetoJuegoSprite = {
  [nombre: string]: TFrame;
};

export type TFrame = {
  posicion: number;
  frames: number;
};

export class ObjetoJuego {
  private _radio: number;
  private _x: number;
  private _y: number;
  private _imagen: HTMLImageElement = document.createElement("img");
  private _peso: number;
  anchoSprite: number;
  altoSprite: number;
  proporcion: number;
  alto: number;
  ancho: number;
  frameX: number;
  frameY: number;
  velocidadX: number = 0;
  velocidadY: number = 0;
  modificadorVelocidad: number = 0;
  dx: number = 0;
  dy: number = 0;
  angulo: number = 0;
  velocidadAngulo: number = 0;
  curvatura: number = 0;
  margenSprite: number;
  borrar: boolean = false;
  sprites: TObjetoJuegoSprite;
  estado: Estado = {} as Estado;
  estadosObjeto: Estados = {} as Estados;
  framesLimite: number = 0;
  sonido: HTMLAudioElement = new Audio();
  colores: number[] = [];
  color: string = "";
  estadoActual: string = "";
  estadoAnterior: string = "";
  juego: Juego;
  contaFrames: number;

  constructor(
    juego: Juego,
    x?: number,
    y?: number,
    radio?: number,
    imagen?: string,
    anchoSprite?: number,
    altoSprite?: number,
    proporcion?: number,
    margenSprite?: number,
    frameX?: number,
    frameY?: number,
    sprites?: TObjetoJuegoSprite,
    estadoActual?: string,
    peso?: number,
    framesLimite?: number
  ) {
    this.juego = juego;
    this._x = x ? x : 0;
    this._y = y ? y : 0;
    this._radio = radio ? radio : 0;
    this._imagen.src = imagen ? imagen : "";
    this.anchoSprite = anchoSprite ? anchoSprite : 0;
    this.altoSprite = altoSprite ? altoSprite : 0;
    this.proporcion = proporcion ? proporcion : 1;
    this.ancho = this.anchoSprite * this.proporcion;
    this.alto = this.altoSprite * this.proporcion;
    this.margenSprite = margenSprite ? margenSprite : 0;
    this.frameX = frameX ? frameX : 0;
    this.frameY = frameY ? frameY : 0;
    this._peso = peso ? peso : 0;
    this.framesLimite = framesLimite ? framesLimite : 0;
    this.contaFrames = 0;

    this.sprites = sprites ? { ...sprites } : {};
    this.estadosObjeto = this.sprites
      ? new Estados(this.sprites)
      : ({} as Estados);

    this.crearEstados();

    this.estadoActual = estadoActual ? estadoActual : "";
    if (this.estadoActual) this.fijarEstado(this.estadoActual);
  }

  public get radio(): number {
    return this._radio;
  }
  public set radio(value: number) {
    this._radio = value;
  }

  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }

  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }

  public get imagen(): HTMLImageElement {
    return this._imagen;
  }
  public set imagen(value: HTMLImageElement) {
    this._imagen = value;
  }

  public get peso(): number {
    return this._peso;
  }
  public set peso(value: number) {
    this._peso = value;
  }

  public crearEstados() {}

  public fijarEstado(estado: string) {
    this.estadoAnterior =
      this.estado.nombre == "" ? estado : this.estado.nombre;
    this.estado = this.estadosObjeto.obtenerEstado(estado);
    if (this.estado) {
      if (this.estado.velocidadFondo > -1)
        this.juego.parametrosJuego.velocidadJuego = this.estado.velocidadFondo;
      this.estado.entrar(this);
      this.estadoActual = this.estado.nombre;
      if (this.estadoAnterior != this.estadoActual) this.frameX = 0;
    }
  }

  modificarColores(colores: number[]) {
    this.colores = colores;
  }

  crearColoresAleatorios(canalAlpha: number = -1) {
    canalAlpha > -1
      ? (this.colores = [
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          canalAlpha,
        ])
      : (this.colores = [
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
        ]);
    this.modificarColor(this.colores);
  }

  modificarColor(colores: number[]) {
    colores.length > 3
      ? (this.color =
          "rgba(" +
          this.colores[0] +
          "," +
          this.colores[1] +
          "," +
          this.colores[2] +
          "," +
          this.colores[3] +
          ")")
      : (this.color =
          "rgb(" +
          this.colores[0] +
          "," +
          this.colores[1] +
          "," +
          this.colores[2] +
          ")");
  }

  modificarProporcion(proporcion: number): void {
    this.proporcion = proporcion;
    this.ancho = this.anchoSprite * this.proporcion;
    this.alto = this.altoSprite * this.proporcion;
  }

  modificarSonido(src: string) {
    if (this.sonido) {
      this.sonido.src = src;
    }
  }

  modificarModificadorVelociad(modificadorVelocidad: number): void {
    this.modificadorVelocidad = modificadorVelocidad;
  }

  modificarVelocidad(velocidadX: number, velocidadY: number): void {
    this.velocidadX = velocidadX;
    this.velocidadY = velocidadY;
  }

  actualizarVelocidad(velocidadX: number, velocidadY: number) {
    this.velocidadX += velocidadX;
    this.velocidadY += velocidadY;
  }

  modificarPosicion(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  actualizarPosicion(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  dibujar(
    ctx: CanvasRenderingContext2D,
    ctxColision?: CanvasRenderingContext2D,
    ctxDebug?: CanvasRenderingContext2D,
    modoDebug: boolean = false,
    forma?: number
  ): void {
    if (ctx) {
      ctx.drawImage(
        this.imagen as CanvasImageSource,
        this.frameX * this.anchoSprite,
        this.frameY * this.altoSprite,
        this.anchoSprite,
        this.altoSprite,
        this._x,
        this._y,
        this.ancho,
        this.alto
      );
    }
    if (ctxColision) {
      ctxColision.save();
      ctxColision.globalAlpha = 1;
      ctxColision.beginPath();
      if (this.color !== "") ctxColision.fillStyle = this.color;
      switch (forma) {
        case 1:
          ctxColision.arc(
            this.x + this.ancho * 0.5,
            this.y + this.alto * 0.5,
            this.radio == 0 ? this.alto * 0.5 : this.radio,
            0,
            2 * Math.PI
          );
          break;
        case 2:
          ctxColision.fillRect(this._x, this._y, this.ancho, this.alto);
          break;
        default:
          ctxColision.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
      }
      ctxColision.fill();
      ctxColision.stroke();
      ctxColision.restore();
    }
    if (ctxDebug && modoDebug) {
      ctxDebug.save();
      ctxDebug.globalAlpha = 1;
      ctxDebug.beginPath();
      if (this.color !== "") ctxDebug.fillStyle = this.color;
      switch (forma) {
        case 1:
          ctxDebug.arc(
            this.x + this.ancho * 0.5,
            this.y + this.alto * 0.5 - this.margenSprite,
            this.radio == 0 ? this.alto * 0.5 : this.radio,
            0,
            2 * Math.PI
          );
          break;
        case 2:
          ctxDebug.strokeRect(this._x, this._y, this.ancho, this.alto);
          break;
        default:
          ctxDebug.arc(
            this._x + this.ancho * 0.5,
            this._y + this.alto * 0.5 - this.margenSprite,
            this.radio,
            0,
            2 * Math.PI
          );
      }
      //ctxDebug.fill();
      ctxDebug.stroke();
      ctxDebug.restore();
    }
  }

  actualizar(deltaTiempo?: number) {
    //M+etodo #1 No inicializa frames desde cero, global
    // this.frameX =
    //   Math.floor(this.juego.contaFrames / (this.framesLimite || 1)) %
    //   (this.estado.frame.frames || 1);
    //Método #2 inicializa frames desde cero, local
    this.frameX++;
    if (this.frameX >= this.estado.sprite.frames) this.frameX = 0;
    this.frameY = this.estado.sprite.posicion || 0;
  }

  estaEnSuelo() {
    if (this.juego.alturaPiso)
      return this.y >= this.juego.alto - this.alto - this.juego.alturaPiso;
    else return this.y >= this.juego.alto - this.alto;
  }

  estaCayendo() {
    return this.y <= this.y + this.velocidadY;
  }
  inicializar(juego: Juego) {}

  eliminar(juego: Juego) {}

  reiniciar() {}
}
