import Particles from "./Particles";

export default function ParticlesBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
      <Particles
        particleColors={["#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
    </div>
  );
}
