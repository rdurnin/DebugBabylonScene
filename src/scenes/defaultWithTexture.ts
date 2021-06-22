import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { GroundBuilder } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

import "@babylonjs/core/Materials/Node/Blocks";

import {CreateSceneClass} from "../createScene";

export class DefaultSceneWithTexture implements CreateSceneClass {

    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        const nodeMaterial = await NodeMaterial.ParseFromSnippetAsync("7IHEQT#57", scene);
    
        // This creates and positions a free camera (non-mesh)
        const camera = new ArcRotateCamera(
            "RenderCamera",
            0,
            Math.PI / 3,
            10,
            new Vector3(0, 0, 0),
            scene
        );
    
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
    
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        const ground = GroundBuilder.CreateGround(
            "ground",
            { width: 6, height: 6 },
            scene
        ); 
        ground.material = nodeMaterial;
    
        return scene;
    };
}

export default new DefaultSceneWithTexture();