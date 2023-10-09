import * as THREE from 'three';
import Experience from "../../Experience";

import PointOfInterest from "./PointOfInterest";

import gsap from 'gsap';

export default class PointsList {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.points = [];

        this.toggleState = {
            "apollo": true,
            "apolloAlt": true,
            "mountain": true,
            "ocean": true,
        }
        
        this.definePoints();
        this.initPoints();
    }

    toggle(newToggleState) {
        this.toggleState = newToggleState;
        console.log(this.toggleState)
        this.definePoints();
        this.initPoints();
    }

    definePoints() {
        this.definedPoints = [
            {type: "apollo",name: "Apollo 11", lat: 0.67416, long: 23.4731},
            {type: "apolloAlt", name: "Apollo 12", lat: -3.1975, long: -23.3856},
            {type: "apollo", name: "Apollo 14", lat: -3.6733, long: -17.4653},
            {type: "apollo", name: "Apollo 15", lat: 26.1008, long: 3.6527},
            {type: "apollo", name: "Apollo 16", lat: -8.9913, long: 15.5144},
            {type: "apollo", name: "Apollo 17", lat: 20.1653, long: 30.7658},
            {type: "ocean", name: "Mare Vaporum", lat: 13.3, long: 3.6},
            {type: "ocean", name: "Mare Tranquillitatis", lat: 8.5, long: 31.4},
            {type: "ocean", name: "Mare Serenitatis", lat: 28.0, long: 17.5},
            {type: "ocean", name: "Mare Fecunditatis", lat: -0.9182, long: 48.6595},
            {type: "ocean", name: "Mare Crisium", lat: 17.0, long: 59.1},
            {type: "ocean", name: "Mare Anguis", lat: 22.6, long: 67.7},
            {type: "ocean", name: "Mare Australe", lat: 38.9, long: 93.0},
            {type: "ocean", name: "Mare Crisium", lat: 17.0, long: 59.1},
            {type: "ocean", name: "Mare Fecunditatis", lat: 7.8, long: 51.3},
            {type: "ocean", name: "Mare Frigoris", lat: 56.0, long: 1.4},
            {type: "mountain", name: "Montes Caucasus", lat: 38.4, long: 10.0},
            {type: "mountain", name: "Montes Apenninus", lat: 18.9, long: 3.7},
            {type: "mountain", name: "Mont Blanc", lat: 45.41, long: 0.44},
            {type: "mountain", name: "Mons Ganau", lat: 4.79, long: 120.59}
            
        ];

        for (let i=0; i<this.definedPoints.length; i++) {
            if (this.toggleState[this.definedPoints[i].type] == false) {
                this.definedPoints.splice(i, 1);
                i--;
            }
        }
    }

    latlongToPos(lat, long, radius) {
        let latRad = Math.PI * lat / 180;
        let longRad = Math.PI * long / 180;
    
        let xPos = radius * Math.cos(latRad) * Math.cos(longRad);
        let yPos = radius * Math.sin(latRad);
        let zPos = - radius * Math.cos(latRad) * Math.sin(longRad);
    
        return new THREE.Vector3(xPos, yPos, zPos);
    }

    initPosAndIds() {
        for (let i=0; i<this.definedPoints.length; i++) {
            this.definedPoints[i].id = "site_" + i;
            if (this.definedPoints[i].position == undefined) {
                this.definedPoints[i].position = this.latlongToPos(this.definedPoints[i].lat, this.definedPoints[i].long, 100);
            }
        }
    }

    initPoints() {
        this.initPosAndIds();

        this.points = [];

        document.dispatchEvent(new CustomEvent('updateDOMPoints', {detail: this.definedPoints}));

        for (let i = 0; i < this.definedPoints.length; i++) {
            const point = this.definedPoints[i];
            this.points.push(new PointOfInterest(point.type, point.id, point.name, point.position));
        }
    }

    focus(lat, long) {
        let def = this;
        let pl = gsap.timeline();

        let duration = 1.4

        let newPos = this.latlongToPos(lat, long, 280);

        pl.to(this.camera.instance.position, {
            duration,
            ease: "power4.out",
            x: newPos.x,
            y: newPos.y,
            z: newPos.z,
            onUpdate: function() {
                def.camera.controls.update();
            },
        },0);
    }

    focusPoint(pointName) {
        let def = this;
        let pl = gsap.timeline();

        let duration = 1.4

        let selectedPoint = this.points.find(point => point.name == pointName);
        
        let newPos = selectedPoint.position.clone().normalize().multiplyScalar(280);
    
        pl.to(this.camera.instance.position, {
            duration,
            ease: "power4.out",
            x: newPos.x,
            y: newPos.y,
            z: newPos.z,
            onUpdate: function() {
                def.camera.controls.update();
            },
        },0);
    }

    update() {
        for (let i=0; i < this.points.length; i++) {
            this.points[i].update();
        }
    }
}