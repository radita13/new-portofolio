"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type { OrbitControls as OrbitControlsType } from "three-stdlib"
import { Model } from "./Model"
import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"

function SceneContent() {
  const { camera } = useThree()
  const cameraRef = useRef(camera)
  const controlsRef = useRef<OrbitControlsType>(null)

  useLayoutEffect(() => {
    // Animasikan kamera dari posisi Z=10 ke posisi Z=5
    gsap.from(cameraRef.current.position, {
      z: 10,
      duration: 2.5, // Durasi 2.5 detik
      ease: "power3.inOut", // Efek easing agar lebih mulus
    })
  }, [])

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 1, 1]} intensity={3} />

      <Model />

      <Environment preset="city" />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        // enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 35 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        touchAction: "none",
      }}
    >
      <SceneContent />
    </Canvas>
  )
}
