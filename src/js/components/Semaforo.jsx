import React, { useEffect, useRef, useState } from "react";

/*
  Semaforo.jsx - Versión definitiva
  - Tres luces: rojo, ámbar, verde (base)
  - Botón derecho: alterna la luz manualmente
  - Botones izquierda:
      - Modo: alterna entre estándar y Colombia
      - Automático: activa ciclo automático (1.5s)
  - Pegado al Palo-Semaforo
  - UX profesional y responsive
*/

export default function Semaforo() {
  const [luzActiva, setLuzActiva] = useState("rojo");
  const [modoPaleta, setModoPaleta] = useState(1); // 1 = base, 2 = alterna
  const [automatico, setAutomatico] = useState(true);

  const intervaloRef = useRef(null);

  const SECUENCIA = ["rojo", "ambar", "verde"];

  // ------------------ Helpers ------------------

  function avanzarLuz() {
    const idx = SECUENCIA.indexOf(luzActiva);
    const siguiente = SECUENCIA[(idx + 1) % SECUENCIA.length];
    setLuzActiva(siguiente);
  }

  function iniciarCicloAutomatico() {
    detenerCiclo();
    intervaloRef.current = setInterval(() => {
      avanzarLuz();
    }, 1500); // 1.5s por luz
  }

  function detenerCiclo() {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  }

  // ------------------ Handlers ------------------

  function alternarModoPaleta() {
    setModoPaleta(modoPaleta === 1 ? 2 : 1);
  }

  function activarAutomatico() {
    setAutomatico(true);
  }

  function alternarLuzManual() {
    detenerCiclo();
    avanzarLuz();
    setAutomatico(false);
  }

  function manejarClickLuz(posicion) {
    detenerCiclo();
    setLuzActiva(posicion);
    setAutomatico(false);
  }

  // ------------------ Ciclo automático ------------------
  useEffect(() => {
    if (automatico) {
      iniciarCicloAutomatico();
    } else {
      detenerCiclo();
    }
    return () => detenerCiclo();
  }, [automatico, luzActiva]);

  // ------------------ Render ------------------
  return (
    <div className="semaforo-wrapper">
      
      {/* Controles izquierda */}
      <div className="semaforo-control izquierda">
        <button className="boton-neon-dark" onClick={alternarModoPaleta}>
          {modoPaleta === 1 ? "Modo Colombia" : "Modo Estándar"}
        </button>
        <button className="boton-neon-dark" onClick={activarAutomatico}>
          Automático
        </button>
      </div>

      {/* Semáforo central */}
      <div className={`semaforo ${modoPaleta === 2 ? "modo-2" : "modo-1"}`}>
        <div
          className={`bombilla posicion-1 ${luzActiva === "rojo" ? "encendida" : ""}`}
          onClick={() => manejarClickLuz("rojo")}
        />
        <div
          className={`bombilla posicion-2 ${luzActiva === "ambar" ? "encendida" : ""}`}
          onClick={() => manejarClickLuz("ambar")}
        />
        <div
          className={`bombilla posicion-3 ${luzActiva === "verde" ? "encendida" : ""}`}
          onClick={() => manejarClickLuz("verde")}
        />
      </div>

      {/* Controles derecha */}
      <div className="semaforo-control derecha">
        <button className="boton-neon-dark" onClick={alternarLuzManual}>
          Alternar luz
        </button>
      </div>

    </div>
  );
}
