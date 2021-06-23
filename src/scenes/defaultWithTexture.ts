import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { Engine } from "@babylonjs/core/Engines/engine";
import { GroundBuilder } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

import "@babylonjs/core/Materials/Node/Blocks";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import "@babylonjs/core/Helpers/sceneHelpers";

import {CreateSceneClass} from "../createScene";

export class DefaultSceneWithTexture implements CreateSceneClass {

    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);
        const nodeMaterial = await NodeMaterial.ParseFromSnippetAsync("5671U2#4", scene);
        const pbrMaterial = new PBRMaterial("pbrMat", scene);

        const url_Env = "https://raw.githubusercontent.com/rdurnin/DebugMeshesLibrary/main/metallic/shanghai_bund_8k_edited.env";

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
    
        // const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        // light.intensity = 0.7;

        const cubeTex = CubeTexture.CreateFromPrefilteredData(url_Env, scene);
        scene.environmentTexture = cubeTex;

        const skyBox = scene.createDefaultSkybox(cubeTex, true);

        const ground = GroundBuilder.CreateGround(
            "ground",
            { width: 6, height: 6 },
            scene
        ); 
        ground.material = nodeMaterial;
        // ground.material = pbrMaterial;
        ground.scaling = new Vector3(100, 100, 100);

        return scene;
    };
}

export default new DefaultSceneWithTexture();