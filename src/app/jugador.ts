import { MensajeFlotante } from "./ui/mensajeFlotante";
import { ManejadorEntrada, Tecla } from "./inputHanlder";
import { Juego } from "./juego";
import { ObjetoJuego } from "./objetoJuego";
import { Llama, Polvo, Splash } from "./particula";

export class Jugador extends ObjetoJuego {
  energia: number = 100;
  minEnergia: number = 2;
  maxEnergia: number = 100;
  gastoEnergia: number = 1;
  crearEstados() {
    this.estadosObjeto.crearEstado(
      "reposo",
      0,
      this.entrarReposo,
      this.manejarEntradaReposo
    );
    this.estadosObjeto.crearEstado(
      "inicioSalto",
      this.juego.parametrosJugador.velocidadFS,
      this.entrarInicioSalto,
      this.manejarEntradaInicioSalto
    );
    this.estadosObjeto.crearEstado(
      "caidaSalto",
      this.juego.parametrosJugador.velocidadFS,
      this.entrarCaidaSalto,
      this.manejarEntradaCaidaSalto
    );
    this.estadosObjeto.crearEstado(
      "correr",
      this.juego.parametrosJugador.velocidadFC,
      this.entrarCorrer,
      this.manejarEntradaCorrer
    );
    this.estadosObjeto.crearEstado(
      "mareado",
      0,
      this.entrarMareado,
      this.manejarEntradaMareado
    );
    this.estadosObjeto.crearEstado(
      "rollo",
      this.juego.parametrosJugador.velocidadFR,
      this.entrarRollo,
      this.manejarEntradaRollo
    );
    this.estadosObjeto.crearEstado(
      "golpeando",
      this.juego.parametrosJugador.velocidadFG,
      this.entrarGolpeando,
      this.manejarEntradaGolpeando
    );
  }

  entrarReposo(objetoJuego: ObjetoJuego) {
    objetoJuego.velocidadX = 0;
    objetoJuego.velocidadY = 0;
  }
  manejarEntradaReposo(objetoJuego: ObjetoJuego, entrada: ManejadorEntrada) {
    if (
      (entrada.keys.includes(Tecla.DERECHA) ||
        entrada.keys.includes(Tecla.IZQUIERDA)) &&
      !entrada.keys.includes(Tecla.ARRIBA)
    ) {
      objetoJuego.fijarEstado("correr");
    } else if (entrada.keys.includes(Tecla.ARRIBA)) {
      objetoJuego.fijarEstado("inicioSalto");
    } else if (
      entrada.keys.includes(Tecla.ROLLO) &&
      (objetoJuego as Jugador).energia > (objetoJuego as Jugador).minEnergia
    ) {
      objetoJuego.fijarEstado("rollo");
    }
  }

  entrarInicioSalto(objetoJuego: ObjetoJuego) {
    if (objetoJuego.estaEnSuelo())
      objetoJuego.velocidadY -= objetoJuego.juego.parametrosJugador.velocidadY;
  }
  manejarEntradaInicioSalto(
    objetoJuego: ObjetoJuego,
    entrada: ManejadorEntrada
  ) {
    if (
      entrada.keys.includes(Tecla.ROLLO) &&
      (objetoJuego as Jugador).energia > (objetoJuego as Jugador).minEnergia
    ) {
      objetoJuego.fijarEstado("rollo");
    } else if (!objetoJuego.estaEnSuelo() && objetoJuego.estaCayendo()) {
      objetoJuego.fijarEstado("caidaSalto");
    }
  }

  entrarCaidaSalto(objetoJuego: ObjetoJuego) {}
  manejarEntradaCaidaSalto(
    objetoJuego: ObjetoJuego,
    entrada: ManejadorEntrada
  ) {
    if (
      entrada.keys.includes(Tecla.ROLLO) &&
      (objetoJuego as Jugador).energia > (objetoJuego as Jugador).minEnergia
    ) {
      objetoJuego.fijarEstado("rollo");
    }
    if (objetoJuego.estaEnSuelo()) {
      if (
        entrada.keys.includes(Tecla.IZQUIERDA) ||
        entrada.keys.includes(Tecla.DERECHA)
      ) {
        objetoJuego.fijarEstado("correr");
      } else if (entrada.keys.includes(Tecla.ARRIBA)) {
        objetoJuego.fijarEstado("inicioSalto");
      } else if (entrada.keys.includes(Tecla.ABAJO)) {
        objetoJuego.fijarEstado("reposo");
      } else {
        objetoJuego.fijarEstado("reposo");
      }
    } else {
    }
  }

  entrarCorrer(objetoJuego: ObjetoJuego) {
    if (objetoJuego.juego.entrada.keys.includes(Tecla.DERECHA))
      objetoJuego.velocidadX = objetoJuego.juego.parametrosJugador.velocidadX;
    else if (objetoJuego.juego.entrada.keys.includes(Tecla.IZQUIERDA))
      objetoJuego.velocidadX = -objetoJuego.juego.parametrosJugador.velocidadX;
  }
  manejarEntradaCorrer(objetoJuego: ObjetoJuego, entrada: ManejadorEntrada) {
    let particula = new Polvo(
      objetoJuego.juego,
      objetoJuego.x + objetoJuego.ancho * 0.5,
      objetoJuego.y + objetoJuego.alto
    );
    objetoJuego.juego.particulas.unshift(particula);

    if (objetoJuego.estaEnSuelo()) {
      if (
        entrada.keys.includes(Tecla.DERECHA) ||
        entrada.keys.includes(Tecla.IZQUIERDA)
      ) {
        if (
          entrada.keys.includes(Tecla.ROLLO) &&
          (objetoJuego as Jugador).energia > (objetoJuego as Jugador).minEnergia
        ) {
          objetoJuego.fijarEstado("rollo");
        } else if (entrada.keys.includes(Tecla.ARRIBA)) {
          objetoJuego.fijarEstado("inicioSalto");
        } else {
          objetoJuego.fijarEstado("correr");
        }
      } else {
        if (entrada.keys.includes(Tecla.ABAJO)) {
          objetoJuego.fijarEstado("reposo");
        } else if (
          entrada.keys.includes(Tecla.ROLLO) &&
          (objetoJuego as Jugador).energia > (objetoJuego as Jugador).minEnergia
        ) {
          objetoJuego.fijarEstado("rollo");
        } else {
          objetoJuego.fijarEstado("reposo");
        }
      }
    }
  }

  entrarMareado(objetoJuego: ObjetoJuego) {
    objetoJuego.velocidadX = 0;
  }
  manejarEntradaMareado(objetoJuego: ObjetoJuego, entrada: ManejadorEntrada) {
    if (
      objetoJuego.frameX >=
      objetoJuego.estadosObjeto.estados["mareado"].sprite.frames - 1
    ) {
      if (objetoJuego.estaEnSuelo()) {
        objetoJuego.fijarEstado("reposo");
      } else {
        objetoJuego.fijarEstado("caidaSalto");
      }
    }
  }

  entrarRollo(objetoJuego: ObjetoJuego) {
    if ((objetoJuego as Jugador).energia <= (objetoJuego as Jugador).minEnergia)
      return;
    if (objetoJuego.juego.entrada.keys.includes(Tecla.DERECHA))
      objetoJuego.velocidadX = objetoJuego.juego.parametrosJugador.velocidadRX;
    else if (objetoJuego.juego.entrada.keys.includes(Tecla.IZQUIERDA))
      objetoJuego.velocidadX = -objetoJuego.juego.parametrosJugador.velocidadRX;
    if (
      objetoJuego.estaEnSuelo() &&
      objetoJuego.juego.entrada.keys.includes(Tecla.ARRIBA)
    ) {
      objetoJuego.velocidadY -= objetoJuego.juego.parametrosJugador.velocidadY;
    }
  }

  manejarEntradaRollo(objetoJuego: ObjetoJuego, entrada: ManejadorEntrada) {
    if ((objetoJuego as Jugador).energia <= (objetoJuego as Jugador).minEnergia)
      return;
    objetoJuego.juego.particulas.unshift(
      new Llama(
        objetoJuego.juego,
        objetoJuego.x + objetoJuego.ancho * 0.5,
        objetoJuego.y + objetoJuego.alto * 0.5
      )
    );
    if (
      (objetoJuego as Jugador).energia > (objetoJuego as Jugador).gastoEnergia
    )
      (objetoJuego as Jugador).energia -= (objetoJuego as Jugador).gastoEnergia;
    if (
      entrada.keys.includes(Tecla.ROLLO) &&
      (objetoJuego as Jugador).energia > (objetoJuego as Jugador).minEnergia
    ) {
      if (
        (objetoJuego as Jugador).energia <= (objetoJuego as Jugador).minEnergia
      ) {
        if (objetoJuego.estaEnSuelo()) {
          objetoJuego.fijarEstado("reposo");
        } else {
          objetoJuego.fijarEstado("caidaSalto");
        }
      } else {
        if (entrada.keys.includes(Tecla.ABAJO) && !objetoJuego.estaEnSuelo())
          objetoJuego.fijarEstado("golpeando");
        else objetoJuego.fijarEstado("rollo");
      }
    } else {
      if (objetoJuego.estaEnSuelo()) {
        if (
          entrada.keys.includes(Tecla.DERECHA) ||
          entrada.keys.includes(Tecla.IZQUIERDA)
        ) {
          objetoJuego.fijarEstado("correr");
        } else if (entrada.keys.includes(Tecla.ARRIBA)) {
          objetoJuego.fijarEstado("inicioSalto");
        } else {
          objetoJuego.fijarEstado("reposo");
        }
      } else {
        objetoJuego.fijarEstado("caidaSalto");
      }
    }
  }

  entrarGolpeando(objetoJuego: ObjetoJuego) {
    objetoJuego.velocidadY += objetoJuego.juego.parametrosJugador.caidaGolpe;
    objetoJuego.velocidadX = 0;
  }
  manejarEntradaGolpeando(objetoJuego: ObjetoJuego, entrada: ManejadorEntrada) {
    objetoJuego.juego.particulas.unshift(
      new Llama(
        objetoJuego.juego,
        objetoJuego.x + objetoJuego.ancho * 0.5,
        objetoJuego.y + objetoJuego.alto * 0.5
      )
    );
    if (objetoJuego.estaEnSuelo()) {
      for (let i = 0; i < 30; i++) {
        let particula = new Splash(
          objetoJuego.juego,
          objetoJuego.x + objetoJuego.ancho * 0.5,
          objetoJuego.y + objetoJuego.alto
        );
        objetoJuego.juego.particulas.unshift(particula);
      }

      if (
        entrada.keys.includes(Tecla.DERECHA) ||
        entrada.keys.includes(Tecla.IZQUIERDA)
      ) {
        objetoJuego.fijarEstado("correr");
      } else if (entrada.keys.includes(Tecla.ARRIBA)) {
        objetoJuego.fijarEstado("inicioSalto");
      } else if (
        entrada.keys.includes(Tecla.ROLLO) &&
        (objetoJuego as Jugador).energia > (objetoJuego as Jugador).minEnergia
      ) {
        objetoJuego.fijarEstado("rollo");
      } else {
        objetoJuego.fijarEstado("reposo");
      }
    }
  }

  matarEnemigos() {
    this.juego.enemigos.forEach((enemigo) => {
      if (Juego.colisionCirculos(enemigo, this).colision) {
        if (
          this.estado.nombre == "rollo" ||
          this.estado.nombre == "golpeando"
        ) {
          enemigo.borrar = true;
          this.juego.puntaje++;
          this.juego.explosiones.push(
            this.juego.crearExplosion(
              enemigo.x + enemigo.ancho * 0.5,
              enemigo.y + enemigo.alto * 0.5 - enemigo.margenSprite
            )
          );
          this.juego.mensajesFlotantes.push(
            new MensajeFlotante(this.juego, "+1", enemigo.x, enemigo.y, 50, 50)
          );
        } else {
          this.juego.vidas--;
          enemigo.borrar = true;
          this.fijarEstado("mareado");
        }
      }
    });
  }

  actualizar(deltaTiempo?: number | undefined): void {
    //console.log(this.estado.nombre + " " + this.frameX);
    super.actualizar(deltaTiempo);
    this.estado.manejarEntrada(this, this.juego.entrada);
    this.matarEnemigos();
    if (this.energia < this.maxEnergia) {
      this.energia += 0.25;
    }
    if (this.energia <= this.minEnergia) {
      this.minEnergia = 10;
    } else {
      this.minEnergia = this.gastoEnergia;
    }

    this.x += this.velocidadX;
    if (this.x <= 0) {
      this.x = 0;
    } else if (this.x >= this.juego.ancho - this.ancho) {
      this.x = this.juego.ancho - this.ancho;
    }

    this.y += this.velocidadY;
    if (!this.estaEnSuelo()) {
      this.velocidadY += this.peso;
    } else {
      this.velocidadY = 0;
    }
    if (this.y >= this.juego.alto - this.alto - this.juego.alturaPiso)
      this.y = this.juego.alto - this.alto - this.juego.alturaPiso;
  }
}
