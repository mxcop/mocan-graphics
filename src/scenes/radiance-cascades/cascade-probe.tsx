import { Circle, Line, makeScene2D, Rect, Txt, View2D } from '@motion-canvas/2d';
import { Three } from '../../elements/three';
import * as THREE from 'three';

import fragment from '../../shaders/radiance-cascades/cascade-mem.frag?raw';
import vertex from '../../shaders/radiance-cascades/cascade-mem.vert?raw';
import { createComputed, createSignal, useScene, waitFor } from '@motion-canvas/core';
import { BLACK, BLUE, DARK_BLUE, WHITE } from '../../colors';
import { AABB, LINE_WIDTH, normalize, Vec2 } from '../../types';
import { addIntersectionVectorInterval, addVector } from '../../functions/vector';

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);

    const layerMaterial = new THREE.ShaderMaterial({
        uniforms: {
            probe_size: {value: 4},
            size: {value: new THREE.Vector2(4, 4)}
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
    mesh.material.uniforms.size.value = new THREE.Vector2(4, 4);
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

    const dir_coord = createSignal<Vec2>([0, 0]);
    
    const line_width = LINE_WIDTH * 0.85;

    const dir_index = createSignal<number>(() => {
        return dir_coord()[0] + dir_coord()[1] * 4;
    });

    const text = createSignal<string>(() => {
        return `${Math.round(dir_index())}`;
    });

    const dir_pos = createSignal<Vec2>(() => {
        return [
            dir_coord()[0] * 80 - 160 + line_width / 2,
            dir_coord()[1] * 80 - 160 + line_width / 2
        ];
    });

    const dir = createSignal<Vec2>(() => {
        const angle = 6.28 * ((dir_index() + 0.5) / (4 * 4));
        return [Math.cos(angle), Math.sin(angle)];
    });

    view.add(
        <>
        <Three
            width={320}
            height={320}
            resw={4}
            resh={4}
            camera={camera}
            scene={threeScene}
            layout={false}
        />
        <Txt text={text} x={() => dir_pos()[0] + 35} y={() => dir_pos()[1] + 35} fill={WHITE} stroke={WHITE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
        <Rect position={dir_pos} width={80 - line_width} height={80 - line_width} offset={-1} lineWidth={line_width} stroke={WHITE}></ Rect>
        </>
    );

    addVector(view, WHITE, line_width, [0, 0], dir, 128.0);

    yield* waitFor(2.0);
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            yield* dir_coord([x, y], 1.0);
        }
    }
    yield* waitFor(1.0);
    yield* dir_coord([0, 0], 1.0);

});
