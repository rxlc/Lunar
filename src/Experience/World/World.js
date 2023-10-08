import * as THREE from 'three';
import Experience from "../Experience";

import Helper from '../Utils/Helpers';

import Sun from './Sun';
import Earth from './Earth';
import Moon from './Moon';
import PointsList from './PointsOfInterest/PointsList';

export default class World {
    constructor() {
        this.experience = new Experience();
        //this.helper = new Helper();

        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;

        this.canvasReady = false;

        this.initialize();
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

    update() {
        this.moon.update();
        this.pointsList.update();
    }
}
