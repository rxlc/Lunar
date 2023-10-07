import * as THREE from 'three';
import Experience from "./Experience";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera {
    constructor() {
        this.experience = new Experience();

        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.world = this.experience.world

        this.canvasReady = false;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 1, 50000);
        this.instance.position.set(0, 0, -380);
        this.scene.add(this.instance);
    }

    setOrbit() {
        this.controls = new OrbitControls(this.instance, this.experience.containerRef.current);
        this.controls.target = new THREE.Vector3(0, 0, 0);
        this.controls.enableDamping = true;
        this.controls.enablePan = false;
        this.controls.rotateSpeed = 0.5;
        this.controls.zoomSpeed = 0.4;
        this.controls.minDistance = 280;
        this.controls.maxDistance = 400;
    }

    update() {
        if (this.experience.renderer.instance && this.canvasReady == false) {
            this.setOrbit();
            this.controls.domElement.style.width = `${this.experience.renderer.instance.domElement.clientWidth}px`
            this.controls.domElement.style.height = `${this.experience.renderer.instance.domElement.clientHeight}px`
            this.canvasReady = true;
        }

        this.sizes.on('resize', () => {
            this.resize();
        });

        if (this.canvasReady) {
            this.controls.update();
        }
    }

    resize() {
        this.controls.domElement.style.width = `${this.experience.renderer.instance.domElement.clientWidth}px`
        this.controls.domElement.style.height = `${this.experience.renderer.instance.domElement.clientHeight}px`
        this.instance.aspect = this.sizes.width/this.sizes.height
        this.instance.updateProjectionMatrix();
    }
}