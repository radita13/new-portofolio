import * as THREE from "three"

export {}
declare module "*.glb"
declare module "*.png"

declare module "meshline" {
  export class MeshLineGeometry extends THREE.BufferGeometry {}
  export class MeshLineMaterial extends THREE.Material {
    lineWidth?: number
    color?: string
    resolution?: THREE.Vector2
    depthTest?: boolean
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineGeometry: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineMaterial: any
    }
  }
}
