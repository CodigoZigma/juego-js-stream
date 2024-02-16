import { Cuervo } from "./enemigos/cuervo";
import { Murcielagoa } from "./enemigos/murcielagoa";
import { Murcielagob } from "./enemigos/murcielagob";
import { Fantasmaa } from "./enemigos/fantasmaa";
import { Ruedita } from "./enemigos/ruedita";
import { Explosion } from "./explosion";
import { FondoJuego } from "./fondoJuego";
import { Jugador } from "./jugador";
import { ObjetoJuego, TObjetoJuegoSprite } from "./objetoJuego";
import { TSprite, crearSprites } from "./sprites";
import { ManejadorEntrada, Tecla } from "./inputHanlder";
import { Gusano } from "./enemigos/gusano";
import { UI } from "./ui/ui";
import { Particula } from "./particula";
import { MensajeFlotante } from "./ui/mensajeFlotante";
import { Zombie } from "./enemigos/zombie";

export type TParametrosJuego = {
  FPS: number;
  velocidadJuego: number;
  [parametro: string]: string | number;
};

export type TParametrosJugador = {
  estado: string;
  velocidadX: number;
  velocidadY: number;
  velocidadRX: number;
  velocidadFS: number;
  velocidadFC: number;
  velocidadFR: number;
  velocidadFG: number;
  caidaGolpe: number;
  peso: number;
  framesLimite: number;
  [parametro: string]: string | number;
};

export class Juego {
  alto: number;
  ancho: number;
  temporizador: number;
  intervalo: number;
  contaFrames: number;
  debug: boolean = false;
  jugador: Jugador | null = null;
  fondosJuego: FondoJuego[] = [];
  alturaPiso: number = 0;
  murcielagoA: Murcielagoa[] = [];
  murcielagoB: Murcielagob[] = [];
  fantasmaA: Fantasmaa[] = [];
  ruedita: Ruedita[] = [];
  gusanos: Gusano[] = [];
  cuervos: Cuervo[] = [];
  explosiones: Explosion[] = [];
  mensajesFlotantes: MensajeFlotante[] = [];
  maxEnemigos: number[];
  enemigos: (
    | Murcielagoa
    | Murcielagob
    | Fantasmaa
    | Ruedita
    | Gusano
    | Cuervo
  )[] = [];
  posicionCanvas: DOMRect | null;
  intervaloCuervos: number;
  tiempoProximoCuervo: number;
  spritesFondos: TSprite[] = [] as TSprite[];
  spritesJugador: TSprite[] = [] as TSprite[];
  spritesEnemigos: TSprite[] = [] as TSprite[];
  spritesExplosion: TSprite[] = [] as TSprite[];
  spritesVidas: TSprite[] = [] as TSprite[];
  puntaje: number = 0;
  ctx: CanvasRenderingContext2D;
  ctxColision: CanvasRenderingContext2D;
  ctxDebug: CanvasRenderingContext2D;
  gameOver: boolean;
  entrada: ManejadorEntrada;
  tiempoProximoEnemigo: number = 0;
  intervaloEnemigo: number = 0;
  intervaloAleatorio: number = 0;
  colorFuente: string = "";
  ui: UI = new UI(this);
  particulas: Particula[] = [];
  particulasMaximas: number;
  tiempoMaximo: number;
  tiempo: number = 0;
  timer: number = 0;
  vidas: number = 0;

  //jugador
  parametrosJugador: TParametrosJugador;
  parametrosJuego: TParametrosJuego;
  reloj: number;
  ultimoTiempo: number;
  vida: {
    img: HTMLImageElement;
    ancho: number;
    alto: number;
    proporcion: number;
  };

  constructor(
    ctx: CanvasRenderingContext2D,
    ctxDebug: CanvasRenderingContext2D,
    ctxColision: CanvasRenderingContext2D,
    ancho: number,
    alto: number,
    parametrosJuego: TParametrosJuego,
    parametrosJugador: TParametrosJugador,
    maxEnemigos: number[],
    poscionCanvas?: DOMRect | null
  ) {
    this.ctx = ctx;
    this.ctxDebug = ctxDebug;
    this.ctxColision = ctxColision;
    this.ancho = ancho ? ancho : 0;
    this.alto = alto ? alto : 0;
    this.parametrosJuego = { ...parametrosJuego };
    this.parametrosJugador = { ...parametrosJugador };
    this.maxEnemigos = [...maxEnemigos] || [0, 0, 0, 0];
    this.posicionCanvas = poscionCanvas ? poscionCanvas : null;

    [
      this.spritesFondos,
      this.spritesJugador,
      this.spritesEnemigos,
      this.spritesExplosion,
      this.spritesVidas,
    ] = crearSprites(this);

    const sprite = { ...this.spritesVidas[0] };
    const vida = document.createElement("img");
    vida.src = sprite.nombre;
    this.vida = {
      img: vida,
      ancho: sprite.ancho,
      alto: sprite.alto,
      proporcion: sprite.proporcion,
    };

    this.gameOver = false;
    this.colorFuente = "black";

    this.entrada = new ManejadorEntrada(this);

    this.alturaPiso = 120;
    this.temporizador = 0;

    this.intervalo = 1000 / this.parametrosJuego.FPS || 0;
    this.contaFrames = 0;
    this.tiempo = 0;
    this.timer = 0;
    this.reloj = 0;
    this.tiempoMaximo = 10;
    this.intervaloCuervos = 500;
    this.tiempoProximoCuervo = 0;
    this.tiempoProximoEnemigo = 0;
    this.intervaloEnemigo = 1000;
    this.ultimoTiempo = 0;
    this.intervaloAleatorio = 0;
    this.particulasMaximas = 100;
    this.vidas = 5;

    this.crearFondos();

    this.crearJugador();
  }

  crearFondos() {
    for (let i = 0; i < this.spritesFondos.length; i++) {
      const sprite = { ...this.spritesFondos[i] };
      const fondoJuego = new FondoJuego(
        this,
        sprite.x,
        sprite.y,
        sprite.nombre,
        sprite.ancho,
        sprite.alto,
        0,
        sprite.frames,
        sprite.modificadorVelocidad
      );
      this.fondosJuego.push(fondoJuego);
    }
  }

  crearJugador() {
    const sprite = { ...this.spritesJugador[0] };
    this.jugador = new Jugador(
      this,
      sprite.x,
      sprite.y,
      100,
      sprite.nombre,
      sprite.ancho,
      sprite.alto,
      sprite.proporcion,
      0,
      0,
      0,
      sprite.frames,
      "reposo",
      this.parametrosJugador.peso,
      this.parametrosJugador.framesLimite
    );
  }

  crearEnemigo(tipoEnemigo: number) {
    let enemigo: ObjetoJuego | null;
    let sprite: TSprite = { ...this.spritesEnemigos[tipoEnemigo] };
    switch (tipoEnemigo) {
      case 0:
        enemigo = new Murcielagoa(
          this,
          sprite.nombre,
          sprite.ancho,
          sprite.alto,
          sprite.proporcion,
          0,
          sprite.frames,
          "volando"
        );
        break;
      case 1:
        enemigo = new Murcielagob(
          this,
          sprite.nombre,
          sprite.ancho,
          sprite.alto,
          sprite.proporcion,
          0,
          sprite.frames,
          "volando"
        );
        break;
      case 2:
        enemigo = new Fantasmaa(
          this,
          sprite.nombre,
          sprite.ancho,
          sprite.alto,
          sprite.proporcion,
          0,
          sprite.frames,
          "volando"
        );
        break;
      case 3:
        enemigo = new Ruedita(
          this,
          sprite.nombre,
          sprite.ancho,
          sprite.alto,
          sprite.proporcion,
          0,
          sprite.frames,
          "volando"
        );
        break;
      case 4:
        enemigo = new Gusano(
          this,
          sprite.nombre,
          sprite.ancho,
          sprite.alto,
          sprite.proporcion,
          0,
          sprite.frames,
          "corriendo"
        );
        break;
      case 5:
        enemigo = new Cuervo(
          this,
          sprite.nombre,
          sprite.ancho,
          sprite.alto,
          sprite.proporcion,
          0,
          sprite.frames,
          "volando"
        );
        break;
      case 6:
        enemigo = new Zombie(
          this,
          sprite.nombre,
          sprite.ancho,
          sprite.alto,
          sprite.proporcion,
          130,
          sprite.frames,
          "corriendo"
        );
        break;
      default:
        enemigo = null;
        break;
    }
    if (enemigo) {
      this.enemigos.push(enemigo);
      this.enemigos.sort((a, b) => a.ancho - b.ancho);
    }
  }

  crearEnemigosAlInicio(tipoEnemigo: number, numeroEnemigos: number) {
    for (let i = 0; i < numeroEnemigos; i++) {
      this.crearEnemigo(tipoEnemigo);
    }
  }

  crearEnemigos(deltaTiempo: number, tipoEnemigo: number) {
    if (
      this.tiempoProximoEnemigo >
      this.intervaloEnemigo + this.intervaloAleatorio
    ) {
      this.crearEnemigo(tipoEnemigo);
      this.intervaloAleatorio = Math.random() * 1000 + 500;
      this.tiempoProximoEnemigo = 0;
    } else {
      this.tiempoProximoEnemigo += deltaTiempo;
    }
  }

  crearExplosion(x: number, y: number) {
    let sprite: TSprite = { ...this.spritesExplosion[0] };
    const explosion = new Explosion(
      this,
      x - sprite.ancho * sprite.proporcion * 0.5,
      y - sprite.alto * sprite.proporcion * 0.5,
      0,
      sprite.nombre,
      sprite.ancho,
      sprite.alto,
      sprite.proporcion,
      0,
      0,
      0,
      sprite.frames,
      "explosion"
    );
    explosion.modificarSonido("Fire impact 1.wav");
    return explosion;
  }

  crearClickCuervo = (e: MouseEvent) => {
    if (this.ctxColision) {
      const pc = this.ctxColision.getImageData(
        e.x - (this.posicionCanvas?.left || 0),
        e.y - (this.posicionCanvas?.top || 0),
        1,
        1
      ).data;
      console.log(pc);
      this.enemigos.forEach((enemigo) => {
        //console.log(cuervo.colores);
        if (
          enemigo.colores[0] === pc[0] &&
          enemigo.colores[1] === pc[1] &&
          enemigo.colores[2] === pc[2]
        ) {
          console.log("si");
          enemigo.borrar = true;
          this.puntaje++;
        }
      });
      let posX = e.x - (this.posicionCanvas?.left || 0);
      let posY = e.y - (this.posicionCanvas?.top || 0);
      this.explosiones.push(this.crearExplosion(posX, posY));
    }
  };

  eliminarObjetosJuego() {
    this.explosiones = this.explosiones.filter(
      (explosion) => !explosion.borrar
    );

    this.enemigos = this.enemigos.filter((enemigo) => !enemigo.borrar);

    this.mensajesFlotantes = this.mensajesFlotantes.filter(
      (mensajeFlotante) => !mensajeFlotante.borrar
    );

    this.particulas = this.particulas.filter((particula) => !particula.borrar);
  }

  actualizar(temporizador: number) {
    // this.crearEnemigos(this.temporizador, 1);
    // this.crearEnemigos(this.temporizador, 2);
    //this.crearEnemigos(this.temporizador, 4);
    this.crearEnemigos(this.temporizador, 5);
    //this.crearEnemigos(this.temporizador, 6);

    [
      ...this.fondosJuego,
      ...this.enemigos,
      ...this.particulas,
      ...this.explosiones,
    ].forEach((objeto) => objeto.actualizar());

    this.mensajesFlotantes.forEach((mensaje) => mensaje.actualizar());

    this.jugador?.actualizar();

    if (this.particulas.length > this.particulasMaximas) {
      // this.particulas = this.particulas.slice(0, this.particulasMaximas);
      this.particulas.length = 100;
    }
  }

  dibujar(): void {
    this.fondosJuego.forEach((fondoJuego) => {
      fondoJuego.dibujar(this.ctx);
    });

    this.enemigos.forEach((enemigo) => {
      enemigo.dibujar(this.ctx, this.ctxColision, this.ctxDebug, this.debug, 1);
    });

    this.mensajesFlotantes.forEach((mensaje) => mensaje.dibujar(this.ctx));

    this.jugador?.dibujar(this.ctx, undefined, this.ctxDebug, this.debug, 1);

    this.explosiones.forEach((explosion) => {
      explosion.dibujar(
        this.ctx,
        this.ctxColision,
        this.ctxDebug,
        this.debug,
        1
      );
    });

    this.particulas.forEach((particula) => {
      particula.dibujarParticula(this.ctx);
    });

    this.ui.dibujarPuntaje(this.ctx);
    if (this.gameOver) this.ui.dibujarGameOver(this.ctx);
  }

  limpiar() {
    this.ctx.clearRect(0, 0, this.ancho, this.alto);
    this.ctxColision.clearRect(0, 0, this.ancho, this.alto);
    this.ctxDebug.clearRect(0, 0, this.ancho, this.alto);
  }

  actualizarIntervalo() {
    this.intervalo = 1000 / this.parametrosJuego.FPS || 0;
  }

  renderizar(deltaTiempo: number, debug: boolean = false) {
    console.log("Delta Render:" + deltaTiempo);
    //return;
    if (deltaTiempo < this.intervalo) this.temporizador += deltaTiempo;
    // console.log(
    //   Math.trunc(this.temporizador) + " " + Math.trunc(this.intervalo)
    // );

    if (this.temporizador >= this.intervalo - 1 && !this.gameOver) {
      this.limpiar();
      this.actualizar(this.temporizador);
      this.dibujar();
      this.eliminarObjetosJuego();
      this.contaFrames++;
      this.tiempo += this.temporizador;
      // console.log(" Tiempo " + this.tiempo);
      console.log("Tiempo Frame: " + this.temporizador);
      console.log("Cuenta Frames: " + this.contaFrames);
      this.temporizador = 0;
      if (this.contaFrames % this.parametrosJuego.FPS == 0) this.reloj++;
      if (this.reloj >= this.tiempoMaximo || this.vidas <= 0) {
        console.log("Reloj: " + this.reloj);
        console.log("Tiempo total: " + this.tiempo);
        this.gameOver = true;
        this.tiempo = 0;
        this.contaFrames = 0;
        this.ui.dibujarGameOver(this.ctx);
      }
    }
  }

  public static colisionCirculos(
    objetoInicial: ObjetoJuego,
    objetoFinal: ObjetoJuego,
    separacion?: number
  ): {
    colision: boolean;
    distancia: number;
    sumaRadios: number;
    dx: number;
    dy: number;
  } {
    const dx = objetoFinal.x - objetoInicial.x;
    const dy =
      objetoFinal.y -
      objetoFinal.margenSprite -
      (objetoInicial.y - objetoInicial.margenSprite);
    const distancia = Math.hypot(dy, dx);
    let sumaRadios = objetoInicial.radio + objetoFinal.radio;
    if (separacion) sumaRadios += separacion;
    return {
      colision: distancia < sumaRadios,
      distancia,
      sumaRadios,
      dx,
      dy,
    };
  }

  public static colisionCuadrados(
    objetoInicial: ObjetoJuego,
    objetoFinal: ObjetoJuego,
    separacion?: number
  ) {
    if (
      objetoInicial.x > objetoFinal.x + objetoFinal.ancho ||
      objetoInicial.x + objetoInicial.ancho < objetoFinal.x ||
      objetoInicial.y > objetoFinal.y + objetoFinal.alto ||
      objetoInicial.y + objetoInicial.alto < objetoFinal.y
    ) {
      return { colision: false };
    } else {
      return { colision: true };
    }
  }
}
