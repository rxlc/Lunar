import Experience from '../Experience';
import * as THREE from 'three';

export default class Sun {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.radius = 20;
        this.segments = 50;

        this.textureLoader = new THREE.TextureLoader();
        this.initialize();
    }

    initialize() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
        
        const sunTexture = this.textureLoader.load('textures/sun/suntexture1.jpg'); 

        this.material = new THREE.MeshBasicMaterial({
            map: sunTexture,
        });
        
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.set(0,0,0);
        this.mesh.position.set(2000, 0, 0);
        this.scene.add(this.mesh);
    }
}


