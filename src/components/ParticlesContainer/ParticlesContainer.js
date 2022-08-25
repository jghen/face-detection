import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesOptions from "../../particles.json";

export function ParticlesContainer() {

  const particlesInit = useCallback(main => {
    loadFull(main);
    }, [])


  return <Particles options={particlesOptions} init={particlesInit}/>;
}