import Experience from '../Experience';
import * as THREE from 'three';

export default class Earth {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.radius = 50;
        this.segments = 50;

        this.textureLoader = new THREE.TextureLoader();        
        this.initialize();

    }

    initialize() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
        const earthTexture = this.textureLoader.load('textures/earth/earthtexture2.jpg'); 

        this.material = new THREE.MeshBasicMaterial({
            map: earthTexture,
        });
        
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.mesh.rotation.set(0,0,0);
        this.mesh.position.set(-1200, 0, 0);
        this.scene.add(this.mesh);
    }
}
