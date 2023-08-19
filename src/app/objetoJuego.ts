export type TObjetoJuegoSprite = {
  nombre: string;
  posicion: number;
  frames: number;
};

export class ObjetoJuego {
  private _radio: number;
  private _x: number;
  private _y: number;
  private _imagen: HTMLElement | null;
  anchoSprite: number;
  altoSprite: number;
  alto: number;
  ancho: number;
  posxSprite: number;
  posySprite: number;
  frameX: number;
  frameY: number;
  velocidadX: number;
  velocidadY: number;
  modificadorVelocidad: number;
  dx: number;
  dy: number;
  margenSprite: number;
  borrar: boolean;
  sprites: TObjetoJuegoSprite[];

  constructor(
    x?: number,
    y?: number,
    radio?: number,
    imagen?: HTMLElement | null,
    ancho?: number,
    alto?: number,
    anchoSprite?: number,
    altoSprite?: number,
    margenSprite?: number,
    frameX?: number,
    frameY?: number,
    sprites?: TObjetoJuegoSprite[]
  ) {
    this._radio = radio ? radio : 0;
    this._x = x ? x : 0;
    this._y = y ? y : 0;
    this.velocidadX = 0;
    this.velocidadY = 0;
    this.modificadorVelocidad = 0;
    this.dx = 0;
    this.dy = 0;
    this._imagen = imagen ? imagen : null;
    this.anchoSprite = anchoSprite ? anchoSprite : 0;
    this.altoSprite = altoSprite ? altoSprite : 0;
    this.ancho = ancho ? ancho : 0;
    this.alto = alto ? alto : 0;
    this.margenSprite = margenSprite ? margenSprite : 0;
    this.posxSprite = this._x - this.ancho * 0.5;
    this.posySprite = this._y - this.alto * 0.5 - this.margenSprite;
    this.frameX = frameX ? frameX : 0;
    this.frameY = frameY ? frameY : 0;
    this.sprites = sprites ? [...sprites] : [];
    this.borrar = false;
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

  public get imagen(): HTMLElement | null {
    return this._imagen;
  }
  public set imagen(value: HTMLElement | null) {
    this._imagen = value;
  }

  public estado(estado: string) {
    const estadoSprite = this.sprites.find((sprite) => sprite.nombre == estado);
    return estadoSprite ? estadoSprite : null;
  }

  dibujar(ctx: CanvasRenderingContext2D, modoDebug: boolean): void {
    if (ctx) {
      ctx.drawImage(
        this.imagen as CanvasImageSource,
        this.frameX * this.anchoSprite,
        this.frameY * this.altoSprite,
        this.anchoSprite,
        this.altoSprite,
        this.posxSprite,
        this.posySprite,
        this.ancho,
        this.alto
      );
      if (modoDebug) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.restore();
        ctx.stroke();
      }
    }
  }

  // actualizar(juego: Juego, deltaTiempo?: number) {}

  // reiniciar(juego: Juego) {}
}
