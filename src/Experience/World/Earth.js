import Experience from '..Experience';
import * as THREE from 'three';

export default class Earth {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.radius = 400;
        this.segments = 50;

        this.initialize();
    }
    initialize() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
        this.material = new THREE.MeshPhongMaterial({map:'textures/earth/earthtexture1'});
        this.mesh = new THREE.mesh(this.geometry, this.material);
        this.mesh.rotation.set(0,0,0);
        this.mesh.position.set(-10000, 0, 0);
        this.scene.add(this.mesh);
    }
}
