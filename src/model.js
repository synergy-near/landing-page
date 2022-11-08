import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'
import vertex from './shader/vertexShader.glsl'
import fragment from './shader/fragmentShader.glsl'

import vertexGround from './shader/vrGroundShader.glsl'
import fragmentGround from './shader/frGroundShader.glsl'


class Model {
    constructor(obj) {
        this.name = obj.name
        this.file = obj.file
        this.scene = obj.scene
        this.resize = obj.resize
        this.type = obj.type

        this.isAcrive = false

        this.loader = new GLTFLoader()
        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('./draco/')
        this.loader.setDRACOLoader(this.dracoLoader)
        this.init()
    }

    init() {
        this.loader.load(this.file, (response) => {

            if (this.type == "tree") {

                /*------------------------------
                Original Mesh
                ------------------------------*/
                this.mesh = response.scene.children[0]

                /*------------------------------
                Material Mesh
                ------------------------------*/
                this.material = new THREE.MeshBasicMaterial({
                    color: "#A27035",
                    wireframe: true
                })

                this.mesh.material = this.material

                // /*------------------------------
                // Geometry Mesh
                // ------------------------------*/
                this.geometry = this.mesh.geometry

                console.log(this.geometry)

                /*------------------------------
                 Particles MATERIAL
                 ------------------------------*/

                this.particlesMaterial = new THREE.PointsMaterial({
                    color: 'red',
                    size: 0.02
                })

                this.particlesMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        color1: {
                            // value: new THREE.Color("#D4E09B")
                            // #D4E09B
                            // value: new THREE.Color("#476A6F")


                            value: new THREE.Color("#A27035")
                        },
                        color2: {
                            // value: new THREE.Color("green")
                            // value: new THREE.Color("#21897E")


                            value: new THREE.Color("#563F1B")
                        },
                        bboxMin: {
                            value: this.geometry.boundingBox.min
                        },
                        bboxMax: {
                            value: this.geometry.boundingBox.max
                        },
                        uTime: { value: 0 },
                        resize: { value: this.resize }
                    },
                    vertexShader: vertex,
                    fragmentShader: fragment,
                    transparent: true,
                    depthTest: false,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending
                })

                /*------------------------------
                 Particles GEOMETRY
                 ------------------------------*/
                const sampler = new MeshSurfaceSampler(this.mesh).build()
                const numParticles = 400000

                this.particlesGeometry = new THREE.BufferGeometry()
                const particlesPosition = new Float32Array(numParticles * 3)
                const particlesRandomness = new Float32Array(numParticles * 3)

                for (let i = 0; i < numParticles; i++) {
                    const newPosition = new THREE.Vector3()
                    sampler.sample(newPosition)
                    particlesPosition.set([
                        newPosition.x,
                        newPosition.y,
                        newPosition.z
                    ], i * 3)

                    particlesRandomness.set([
                        Math.random() * 100 - 1,
                        Math.random() * 100 - 1,
                        Math.random() * 100 - 1,
                    ], i * 3)
                }

                this.particlesGeometry.setAttribute('position', new
                    THREE.BufferAttribute(particlesPosition, 3))

                this.particlesGeometry.setAttribute('aRandom', new
                    THREE.BufferAttribute(particlesRandomness, 3))

                /*------------------------------
                Particles
                ------------------------------*/
                this.particles = new THREE.Points(
                    this.particlesGeometry, this.particlesMaterial
                )

                this.particles.scale.set(this.mesh["scale"].x, this.mesh["scale"].y, this.mesh["scale"].z)
                this.particles.rotation.set(this.mesh["rotation"].x, this.mesh["rotation"].y, this.mesh["rotation"].z)
            }

            if (this.type == "ground") {

                console.log("GROUND")
                console.log("GROUND")
                /*------------------------------
                Original Mesh
                ------------------------------*/
                this.mesh = response.scene.children[0]

                /*------------------------------
                Material Mesh
                ------------------------------*/
                this.material = new THREE.MeshBasicMaterial({
                    color: "#A27035",
                    wireframe: true
                })

                this.mesh.material = this.material

                // /*------------------------------
                // Geometry Mesh
                // ------------------------------*/
                this.geometry = this.mesh.geometry

                console.log(this.geometry)

                /*------------------------------
                 Particles MATERIAL
                 ------------------------------*/



                this.particlesMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        color1: {
                            value: new THREE.Color("#A27035")
                        },
                        color2: {
                            value: new THREE.Color("#563F1B")
                        },
                        bboxMin: {
                            value: this.geometry.boundingBox.min
                        },
                        bboxMax: {
                            value: this.geometry.boundingBox.max
                        },
                        uTime: { value: 0 },
                        resize: { value: this.resize }
                    },
                    vertexShader: vertexGround,
                    fragmentShader: fragmentGround,
                    transparent: true,
                    depthTest: false,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending
                })

                /*------------------------------
                Particles
                ------------------------------*/
                this.particles = new THREE.Points(
                    this.mesh.geometry, this.particlesMaterial
                )

                this.particles.scale.set(this.mesh["scale"].x, this.mesh["scale"].y, this.mesh["scale"].z)
                this.particles.rotation.set(this.mesh["rotation"].x, this.mesh["rotation"].y, this.mesh["rotation"].z)

                this.particles.rotation.set(0, 120, 0)
                // object.rotateX(angle);
                // object.rotateY(angle);
                // object.rotateZ(angle);
            }


            this.add()
        })
    }

    add() {
        this.isAcrive = true
        this.scene.add(this.particles)
    }
}

export default Model