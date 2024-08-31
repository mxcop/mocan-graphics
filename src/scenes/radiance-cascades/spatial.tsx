import { Circle, Line, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { Three } from '../../elements/three';
import * as THREE from 'three';

import fragment from '../../shaders/radiance-cascades/spatial.frag?raw';
import vertex from '../../shaders/radiance-cascades/spatial.vert?raw';
import { createComputed, createSignal, useScene } from '@motion-canvas/core';
import { BLACK, BLUE, DARK_BLUE } from '../../colors';
import { LINE_WIDTH, normalize, Vec2 } from '../../types';

/* Canvas = 960x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);

    const layerMaterial = new THREE.ShaderMaterial({
        uniforms: {
            dir_count: {value: 512},
            size: {value: new THREE.Vector2(128, 64)},
            animate: {value: 0.0}
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
    mesh.material.uniforms.dir_count.value = 512;
    mesh.material.uniforms.animate.value = 0.0;
    mesh.material.uniforms.size.value = new THREE.Vector2(128, 64);
    mesh.renderOrder = 0;
    layer = mesh;
    threeScene.add(layer);
    
    const camera = new THREE.OrthographicCamera(0, 1, 0, 1, 0, 1);
    const orbit = new THREE.Group();
    orbit.add(camera);
    threeScene.add(orbit);
    
    const dirCount = createSignal<number>(512);
    const animateT = createSignal<number>(0.0);
    
    const update = createComputed(() => {
        const dc: number = dirCount();
        mesh.material.uniforms.dir_count.value = dc;
        mesh.material.uniforms.animate.value = animateT();
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
            width={768}
            height={512}
            resw={96}
            resh={64}
            camera={camera}
            scene={threeScene}
            layout={false}
        />
        <Line
            points={[
                top_point,
                bottom_point
            ]}
            stroke={BLUE}
            lineWidth={LINE_WIDTH}
            opacity={.5}
            lineCap={'round'}
        /> 
        <Circle
            position={top_point}
            size={24}
            fill={BLUE}
            stroke={BLACK}
            lineWidth={16}
            strokeFirst={true}
        />
        <Circle
            position={bottom_point}
            size={24}
            fill={BLUE}
            stroke={BLACK}
            lineWidth={16}
            strokeFirst={true}
        />
        <Txt text={"spacing"} position={mid_point} offsetX={-1.0} opacity={txt_opacity} fill={BLUE} stroke={BLUE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={32} fontWeight={900} />
        </>
    );

    yield* dist(32.0, 2.0);
    yield txt_opacity(1.0, 2.0);
    yield* dist(64.0, 2.0);
    yield* dist(128.0, 2.0);
    yield* dist(256.0, 2.0);
    yield txt_opacity(0.0, 2.0);
    yield* dist(0.0, 2.0);
});
