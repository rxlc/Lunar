import * as THREE from 'three';
import Experience from "../../Experience";

export default class PointOfInterest {
    constructor(type, id, name, position) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.world = this.experience.world;

        this.position = position;
        this.currentPos = new THREE.Vector2(0, 0),
        this.velocity = new THREE.Vector2(0, 0),
        this.id = id;
        this.name = name;
        this.type = type;

        this.ready = false;

        this.raycaster = new THREE.Raycaster()

        this.minDist = 2;
        this.easing = 0.4;

        this.initialize();

        this.pointListReady = false;
    }

    initialize() {
        this.element = document.querySelector(`.${this.id}`);
    }

    update() {
        if (this.pointListReady == false) {
            this.world = this.experience.world;
            if (this.world.pointsList) {
                this.pointsList = this.world.pointsList;
                this.pointsListPoints = this.world.pointsList.points
                this.pointListReady = true;
            }
        }

        if (this.ready) {
            const screenPos = this.position.clone()
            screenPos.project(this.camera.instance)

            this.raycaster.setFromCamera(screenPos, this.camera.instance)

            const intersects = this.raycaster.intersectObject(
                this.experience.world.moon.mesh, true)

            if (intersects.length === 0) {
                this.element.classList.add('visible')
            } else {
                const intersectionDistance = intersects[0].distance
                const pointDistance = this.position.distanceTo(this.camera.instance.position);

                if (intersectionDistance < pointDistance) {
                    this.element.classList.remove('visible')
                } else {
                    this.element.classList.add('visible')
                }
            }

            const targetX = screenPos.x * this.experience.sizes.width * 0.5;
            const targetY = -screenPos.y * this.experience.sizes.height * 0.5;

            if (targetX == Infinity || targetY == Infinity) {
                this.element.style.transform = `translateX(${targetX}px) translateY(${targetY}px)`
            } else {
                let dx = targetX - this.currentPos.x;
                let dy = targetY - this.currentPos.y;

                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.minDist) {
                    if (distance != 0) {
                        dx /= distance;
                        dy /= distance;
                    }
                }

                let translateX = this.currentPos.x + dx * this.easing;
                let translateY = this.currentPos.y + dy * this.easing;

                this.currentPos.x = translateX;
                this.currentPos.y = translateY;

                this.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
            }
        } else {
            let element = document.querySelector(`.${this.id}`);
            if (element && this.pointListReady) {
                this.element = element;
                this.ready = true;

                if (this.type === 'apollo' || this.type === 'apolloAlt') {
                    this.element.addEventListener('click', () => {
                        this.pointsList.focus(this.name);
                        document.dispatchEvent(new CustomEvent('apolloClicked', {detail: this.name}));
                    })
                }
            }   
        }
    }
}