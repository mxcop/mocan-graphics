import { Circle, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { BLACK, BLUE, DARK_BLUE, GREEN, RED, YELLOW } from '../../colors';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';
import { addLayeredGrid } from '../../functions/grid';
import { LINE_WIDTH, Vec2 } from '../../types';
import { addCascadedProbe, addProbe } from '../../functions/radiance-cascades';

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);

    const probe_pos = createSignal<Vec2>([0, 0]);

    /* 16x probe */
    const probe16_opacity = createSignal(1.0);
    addProbe(view, BLUE, probe_pos, 12, 0.0, 640.0, probe16_opacity);
    
    const probe_split1_opacity = createSignal(0.0);
    addProbe(view, GREEN, probe_pos, 12, 120.0, 640.0, probe_split1_opacity);
    
    const probe_split2_opacity = createSignal(0.0);
    addProbe(view, RED, probe_pos, 12, 280.0, 640.0, probe_split2_opacity);

    view.add(
        <>
        <Circle size={120.0 * 2.0 - LINE_WIDTH} lineWidth={LINE_WIDTH} stroke={"#3d3a34"} opacity={probe_split1_opacity}></ Circle>
        <Circle size={280.0 * 2.0 - LINE_WIDTH} lineWidth={LINE_WIDTH} stroke={"#3d3a34"} opacity={probe_split2_opacity}></ Circle>
        </>
    );

    /* Animation */
    yield* probe_split1_opacity(1.0, 2.0);

    yield* waitFor(2.0);

    yield* probe_split2_opacity(1.0, 2.0);
    
    yield* waitFor(2.0);

    yield* all(
        probe_split1_opacity(0.0, 2.0),
        probe_split2_opacity(0.0, 2.0)
    );

});
