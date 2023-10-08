import * as THREE from 'three';
import Experience from "../Experience";

export default class Wave {
    constructor(lat, long) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.setOuterRadius = 1;
        this.setInnerRadius = 0;
        this.setHeight = 102;

        this.outerRadius = this.setOuterRadius;
        this.innerRadius = this.setInnerRadius;
        this.height = this.setHeight;

        this.speed = 3;

        this.idleCounter = 0;
        this.idleTime = 80;
        this.idle = false;

        this.opacity = 1;
        this.fade = false;

        this.setOrientation(lat, long);
        this.createRing();
    }

    setOrientation(lat, long) {
        const latRad = lat * Math.PI / 180;
        const longRad = -long * Math.PI / 180;
        
        this.rotation = new THREE.Euler(-latRad, -longRad, 0, 'YXZ');   
    }

    createRing() {
        let shape = new THREE.Shape();

        shape.absarc(0, 0, this.outerRadius, 0, Math.PI * 2, false);
        shape.absarc(0, 0, this.innerRadius, 0, Math.PI * 2, true);

        var extrudeSettings = {
            steps: 1,
            depth: this.height,
            bevelEnabled: false,
        };

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        var material = new THREE.MeshBasicMaterial({color: 0xFF4F79, transparent: true, opacity: this.opacity});

        this.ring = new THREE.Mesh(geometry, material);
        this.ring.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        this.scene.add(this.ring);
    }

    update() {
        if (!this.idle) {
            this.outerRadius += 0.03 * this.speed;
            this.innerRadius += this.fade ? 0.03 * this.speed : 0.031 * this.speed;
            this.height -= 0.006 * this.speed;

            this.scene.remove(this.ring);

            if (this.innerRadius >= this.outerRadius) this.fade = true;

            if (this.fade) this.opacity -= 0.03 * this.speed;

            if (this.opacity <= 0) {
                this.outerRadius = this.setOuterRadius;
                this.innerRadius = this.setInnerRadius;
                this.height = this.setHeight;
                this.opacity = 1
                
                this.fade = false;
                this.idle = true;
                this.idleCounter = 0;
            } else {
                this.createRing();
            }
        } else {
            this.idleCounter++;

            if (this.idleCounter > this.idleTime) {
                this.idle = false;
            }
        }
    }
}