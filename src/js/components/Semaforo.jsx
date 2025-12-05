import React, { useEffect, useRef, useState } from "react";

/*

En este Semaforo se utilizron los siguientes Hooks 

useState, para gestionar los estados que cambian segun lo visto en clase 
Const LuzActuva, La luz que esta encendida (compaginado con css)
Const ModoPaleta, controla los modos Estandar o Colombia
Const Automatico, control del SetINterval, activo o manual.

useRef, guarda la Cont setInterval sin causar render, asi no rompe el ciclo

useEffect, se utilizo para automatizar el ciclo , apaga el ciclo anterior limpia la memoria
          y ejecuta si el usuario dio clic en automatico o manual.

          
  Semaforo.jsx 
  - Tres luces: rojo, ámbar, verde (ESTADO POR DEFECTO)
  en modo Colombia (luces Amarillo Azul y Rojo)
  - Botón derecho: alterna la luz manualmente
  - Botones izquierda:
      - Modo: alterna entre estándar y Colombia (CAMBIAN LOS COLORES A AMARILLO AZUL Y ROJO)
      - Automático: activa ciclo automático (1.5s ENTRE CABIO DE LUCES)
 


*/

export default function Semaforo() {
  const [luzActiva, setLuzActiva] = useState("rojo");
  const [modoPaleta, setModoPaleta] = useState(1); // 1 =ESTADO ESTANDAR, 2 = alterna
  const [automatico, setAutomatico] = useState(true);

  const intervaloRef = useRef(null);

  const SECUENCIA = ["rojo", "ambar", "verde"];

  // ------------------ FUNCIONES------------------

  function avanzarLuz() {
    const idx = SECUENCIA.indexOf(luzActiva);
    const siguiente = SECUENCIA[(idx + 1) % SECUENCIA.length];
    setLuzActiva(siguiente);
  }

  function iniciarCicloAutomatico() {
    detenerCiclo();
    intervaloRef.current = setInterval(() => {
      avanzarLuz();
    }, 1500); // SEGUNDOS EN MILISEGUNDOS PARA EL INTERCAMBIO AUTOMATICO, COMPROBAR.
  }

  function detenerCiclo() {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  }

  // ------------------BOTONES FUNCIONALES EN LOS MODOS Y AUTOMATICO------------------

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

  // ------------------ CICLO AUTOMATICO CON USEEFFECT------------------
  useEffect(() => {
    if (automatico) {
      iniciarCicloAutomatico();
    } else {
      detenerCiclo();
    }
    return () => detenerCiclo();
  }, [automatico, luzActiva]);

  // ------------------ RENDER EN DIVS  ------------------
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
          Elige la luz
        </button>
      </div>

    </div>
  );
}
