import * as THREE from 'three';
import Experience from "../Experience";

import normalVertex from '../Shaders/Normals/normal_vertex'
import normalFragment from '../Shaders/Normals/normal_fragment'

export default class Moon {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.radius = 100;
        this.segments = 50;

        this.clock = new THREE.Clock();

        this.distance = 1000;
        this.lightPosition = new THREE.Vector3(0, 0, 0);
        
        this.initialize();
    }


    initialize() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);  

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                lightPosition: {
                    type: 'v3',
                    value: new THREE.Vector3(1000, 0, 0)
                },
                textureMap: {
                    type: 't',
                    value: new THREE.TextureLoader().load('textures/moon/moontexture.jpg')
                },
                normalMap: {
                    type: 't',
                    value: new THREE.TextureLoader().load('textures/moon/moonnormal.jpg')
                },
                uvScale: {
                    type: 'v2',
                    value: new THREE.Vector2(1, 1)
                }
            },
            vertexShader: normalVertex,
            fragmentShader: normalFragment
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.geometry.computeTangents();
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.set(0, 0, 0);
        this.scene.add(this.mesh);
    }

    updateLightPosition() {
        this.lightPosition.x = Math.sin(5/*this.clock.getElapsedTime()*/) * this.distance;
        this.lightPosition.x = Math.sin(5/*this.clock.getElapsedTime()*/) * this.distance;
    }

    update() {  
        this.updateLightPosition();
    }
}