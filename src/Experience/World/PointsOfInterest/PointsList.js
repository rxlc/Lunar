import * as THREE from 'three';
import Experience from "../../Experience";

import PointOfInterest from "./PointOfInterest";

export default class PointsList {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.points = [];

        this.definePoints();
        this.initPoints();
    }

    definePoints() {
        this.definedPoints = [
            {type: "apollo", id: "site-0", name: "Apollo 11", lat: 0.67416, long: 23.4731},
            {type: "apolloAlt", id: "site-1", name: "Apollo 12", lat: -3.1975, long: -23.3856},
            {type: "apollo", id: "site-2", name: "Apollo 14", lat: -3.6733, long: -17.4653},
            {type: "apollo", id: "site-3", name: "Apollo 15", lat: 26.1008, long: 3.6527},
            {type: "apollo", id: "site-4", name: "Apollo 16", lat: -8.9913, long: 15.5144},
            {type: "apollo", id: "site-5", name: "Apollo 17", lat: 20.1653, long: 30.7658},
        ];
    }

    latlongToPos(lat, long, radius) {
        let latRad = Math.PI * lat / 180;
        let longRad = Math.PI * long / 180;
    
        let xPos = radius * Math.cos(latRad) * Math.cos(longRad);
        let yPos = radius * Math.sin(latRad);
        let zPos = - radius * Math.cos(latRad) * Math.sin(longRad);
    
        return new THREE.Vector3(xPos, yPos, zPos);
    }

    initPositions() {
        for (let i=0; i<this.definedPoints.length; i++) {
            if (this.definedPoints[i].position == undefined) {
                this.definedPoints[i].position = this.latlongToPos(this.definedPoints[i].lat, this.definedPoints[i].long, 100);
            }
        }
    }

    initPoints() {
        this.initPositions();

        this.points = [];

        document.dispatchEvent(new CustomEvent('updateDOMPoints', {detail: this.definedPoints}));

        for (let i = 0; i < this.definedPoints.length; i++) {
            const point = this.definedPoints[i];
            this.points.push(new PointOfInterest(point.type, point.id, point.name, point.position));
        }
    }

    update() {
        for (let i=0; i < this.points.length; i++) {
            this.points[i].update();
        }
    }
}