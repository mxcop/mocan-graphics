import { Circle, Line, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { Three } from '../../elements/three';
import * as THREE from 'three';

import fragment from '../../shaders/radiance-cascades/cascade-mem.frag?raw';
import vertex from '../../shaders/radiance-cascades/cascade-mem.vert?raw';
import { createComputed, createSignal, useScene } from '@motion-canvas/core';
import { BLACK, BLUE, DARK_BLUE } from '../../colors';
import { LINE_WIDTH, normalize, Vec2 } from '../../types';

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);

    const layerMaterial = new THREE.ShaderMaterial({
        uniforms: {
            probe_size: {value: 4},
            size: {value: new THREE.Vector2(64, 64)}
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthTest: false,
    });
    
    const threeScene = new THREE.Scene();
    
    const plane = new THREE.PlaneGeometry();
    let layer: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
    const material = layerMaterial.clone();
    const mesh = new THREE.Mesh(plane, material);
    mesh.material.uniforms.probe_size.value = 4;
    mesh.material.uniforms.size.value = new THREE.Vector2(64, 64);
    mesh.renderOrder = 0;
    layer = mesh;
    threeScene.add(layer);
    
    const camera = new THREE.OrthographicCamera(0, 1, 0, 1, 0, 1);
    const orbit = new THREE.Group();
    orbit.add(camera);
    threeScene.add(orbit);
    
    const probeSize = createSignal<number>(4);
    
    const update = createComputed(() => {
        mesh.material.uniforms.probe_size.value = new THREE.Vector2(probeSize(), probeSize());
    });
    
    { /* Setup */
        useScene().lifecycleEvents.onBeginRender.subscribe(update);
        orbit.position.set(0, 0, 0);
        orbit.rotation.set(0, 0, 0);
        camera.rotation.set(0, 0, 0);
        camera.position.set(0, 0, 0);
    }

    const occ_point: Vec2 = [-256 + 8, 0];

    const up_vec: Vec2 = normalize([1, -1]);
    const down_vec: Vec2 = normalize([1, 1]);
    const right_vec: Vec2 = [up_vec[0], 0];

    const dist = createSignal(0.0);
    const txt_opacity = createSignal(0.0);

    const top_point = createSignal<Vec2>(() => {
        return [
            occ_point[0] + up_vec[0] * dist(),
            occ_point[1] + up_vec[1] * dist()
        ];
    });

    const bottom_point = createSignal<Vec2>(() => {
        return [
            occ_point[0] + down_vec[0] * dist(),
            occ_point[1] + down_vec[1] * dist()
        ];
    });

    const mid_point = createSignal<Vec2>(() => {
        return [
            occ_point[0] + right_vec[0] * dist() + 24.0,
            occ_point[1] + right_vec[1] * dist()
        ];
    });

    view.add(
        <>
        <Three
            width={512}
            height={512}
            resw={64}
            resh={64}
            camera={camera}
            scene={threeScene}
            layout={false}
        />
        </>
    );

});
