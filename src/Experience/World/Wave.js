import * as THREE from 'three';
import Experience from "../Experience";

export default class Wave {
    constructor(lat, long, mag) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.setOuterRadius = 1;
        this.setInnerRadius = 0;
        this.setHeight = 102;

        this.outerRadius = this.setOuterRadius;
        this.innerRadius = this.setInnerRadius;
        this.height = this.setHeight;

        this.speed = Math.random() * 2 + 3;
        this.magnitude = mag;

        this.idleCounter = 0;
        this.idleTime = 80;
        this.idle = false;

        this.opacity = 1;
        this.fade = false;

        this.setOrientation(lat, long);
        this.createRing();
    }

    setOrientation(lat, long) {
        this.pointsList = this.experience.world.pointsList;
        let pos = this.pointsList.latlongToPos(lat, long, 100);
        
        let dummyObject = new THREE.Object3D();
        dummyObject.lookAt(pos);
        
        this.rotation = dummyObject.rotation;
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
            this.innerRadius += this.fade ? 0.03 * this.speed : (0.03 + (0.001 + (4-this.magnitude)/4 * 0.001)) * this.speed;
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