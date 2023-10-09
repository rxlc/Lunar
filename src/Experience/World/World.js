import * as THREE from 'three';
import Experience from "../Experience";

import Helper from '../Utils/Helpers';

import Sun from './Sun';
import Earth from './Earth';
import Moon from './Moon';
import PointsList from './PointsOfInterest/PointsList';
import Wave from './Wave';

export default class World {
    constructor() {
        this.experience = new Experience();
        //this.helper = new Helper();

        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;

        this.canvasReady = false;

        this.speed = 0;

        this.waves = [];

        this.initialize();
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    initialize() {
        this.initSkyBox();

        this.earth = new Earth();
        this.sun = new Sun();
        this.moon = new Moon();
        this.pointsList = new PointsList();
    }

    initSkyBox() {
        const envMapTexture = new THREE.CubeTextureLoader().load([
            'textures/skybox/right.png', 'textures/skybox/left.png',
            'textures/skybox/top.png', 'textures/skybox/bottom.png',
            'textures/skybox/front.png', 'textures/skybox/back.png'
        ]);

        this.scene.background = envMapTexture
    }

    setWaves(inputWaves) {
        console.log(inputWaves)
        for (let i = 0; i < this.waves.length; i++) {
            this.scene.remove(this.waves[i].ring);
        }

        this.waves = [];

        for (let i = 0; i < inputWaves.length; i++) {
            this.waves.push(new Wave(inputWaves[i].Lat, inputWaves[i].Long, inputWaves[i].Magnitude, inputWaves[i].color));
        }
    }

    update() {
        this.moon.update();
        this.pointsList.update();

        for (let i=0; i<this.waves.length; i++) {
            this.waves[i].update();
        }

        this.moon.mesh.rotation.y += 0.0001 * this.speed;
    }
}
