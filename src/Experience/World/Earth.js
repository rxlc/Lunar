import Experience from '../Experience';
import * as THREE from 'three';

export default class Earth {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.radius = 400;
        this.segments = 50;

        this.textureLoader = new THREE.TextureLoader();        
        this.initialize();

    }

    initialize() {
        this.textureLoader.load('textures/earth/earthtexture1.jpg', (texture) => {
            this.geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
            this.material = new THREE.MeshPhongMaterial({ map: texture });
          
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            
            this.mesh.rotation.set(0,0,0);
            this.mesh.position.set(-1000, 0, 0);
            this.scene.add(this.mesh);
        });
    }
}
