import { Circle, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { BLACK, BLUE, DARK_BLUE, GREEN, RED, YELLOW } from '../../colors';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';
import { addLayeredGrid } from '../../functions/grid';
import { LINE_WIDTH, Vec2 } from '../../types';
import { addCascadedProbe, addProbe } from '../../functions/radiance-cascades';

/* Canvas = 960x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);

    const probe_pos = createSignal<Vec2>([-128, 0]);

    /* 16x probe */
    const probe16_opacity = createSignal(1.0);
    addProbe(view, "#3d3a34", probe_pos, 16, 0.0, 640.0, probe16_opacity);
    addProbe(view, BLUE, probe_pos, 16, 0.0, 240.0, probe16_opacity);

    /* 32x probe */
    const probe32_opacity = createSignal(0.0);
    addProbe(view, "#3d3a34", probe_pos, 32, 0.0, 640.0, probe32_opacity);
    addProbe(view, BLUE, probe_pos, 32, 0.0, 480.0, probe32_opacity);
    
    const hit_time = createSignal(0.0);

    view.add(
        <>
        <Circle
        x={-300}
        size={96}
        opacity={() => 1.0 - hit_time()}
        fill={YELLOW}
        />
        <Circle
        x={-300}
        size={96}
        opacity={hit_time}
        fill={RED}
        />
        <Txt text={"!"} x={-300} opacity={hit_time} fill={BLACK} stroke={BLACK} lineJoin={'round'} lineWidth={2} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={64} fontWeight={900} />
        </>,
    );

    /* Animation */
    yield* probe_pos([32, 0], 2.0);
    yield* hit_time(1.0, 2.0);

    yield probe16_opacity(0, 2.0);
    yield* waitFor(1.0);
    yield* probe32_opacity(1, 2.0);
    
    yield* hit_time(0.0, 2.0);

    /* Reset */
    yield* probe_pos([-128, 0], 2.0);
    yield probe32_opacity(0, 2.0);
    yield* waitFor(1.0);
    yield* probe16_opacity(1, 2.0);

    // addCascadedProbe(view, [0, 0], {
    //     count: 3,
    //     dir_count: 4,
    //     interval_length: 24.0,
    //     colors,
    //     branch_factor: 2
    // });
    // view.add(
    //     <Txt text={"2x branching"} x={-650} y={250} fill={WHITE} stroke={BLACK} lineJoin={'round'} lineWidth={24} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={40} fontWeight={800} />
    // );

    // addCascadedProbe(view, [400, 0], {
    //     count: 3,
    //     dir_count: 4,
    //     interval_length: 12.0,
    //     colors,
    //     branch_factor: 4
    // });
    // view.add(
    //     <Txt text={"4x branching"} x={400} y={250} fill={WHITE} stroke={BLACK} lineJoin={'round'} lineWidth={24} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={40} fontWeight={800} />
    // );

});
