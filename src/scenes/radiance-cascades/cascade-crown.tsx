import { Circle, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { BLACK, BLUE, DARK_BLUE, DARK_GREEN, GREEN, RED, WHITE, YELLOW } from '../../colors';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';
import { addLayeredGrid } from '../../functions/grid';
import { AABB, LINE_WIDTH, Vec2 } from '../../types';
import { addCascadedProbe, addProbe } from '../../functions/radiance-cascades';
import { addIndicatorLine, addIntersectionVectorInterval } from '../../functions/vector';

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);
    const grid_bb: AABB = [[-4 * 64, -4 * 64], [4 * 64, 4 * 64]];

    const blue_opacity = createSignal<number>(1.0);
    for (let y = -2; y < 2; y++) {
        for (let x = -2; x < 2; x++) {
            addProbe(view, BLUE, [x * 150 + 75, y * 150 + 75], 4, 0.0, 64.0, blue_opacity);
        }
    }
    
    const green_opacity = createSignal<number>(0.0);
    for (let y = -1; y < 1; y++) {
        for (let x = -1; x < 1; x++) {
            addProbe(view, GREEN, [x * 300 + 150, y * 300 + 150], 8, 64.0, 64.0 + 64.0, green_opacity);
        }
    }

    const blue_spacing_opacity = createSignal<number>(1.0);
    const green_spacing_opacity = createSignal<number>(0.0);
    
    /* Blue spacing */
    addIndicatorLine(view, DARK_BLUE, LINE_WIDTH * 0.8, [-75, 285], [-225, 285], -16, blue_spacing_opacity);
    view.add(
        <>
        <Txt text={"1u"} position={[(-75 + -225) / 2, 295]} opacity={blue_spacing_opacity} fill={DARK_BLUE} stroke={BLACK} lineJoin={'round'} lineWidth={20} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={32} fontWeight={900} />
        <Txt text={"1u"} position={[(-75 + -225) / 2, 295]} opacity={blue_spacing_opacity} fill={DARK_BLUE} stroke={DARK_BLUE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={32} fontWeight={900} />
        </>
    );

    /* Green spacing */
    addIndicatorLine(view, DARK_GREEN, LINE_WIDTH * 0.8, [150, 285], [-150, 285], -16, green_spacing_opacity);
    view.add(
        <>
        <Txt text={"2u"} position={[0, 295]} opacity={green_spacing_opacity} fill={DARK_GREEN} stroke={BLACK} lineJoin={'round'} lineWidth={20} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={32} fontWeight={900} />
        <Txt text={"2u"} position={[0, 295]} opacity={green_spacing_opacity} fill={DARK_GREEN} stroke={DARK_GREEN} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={32} fontWeight={900} />
        </>
    );

    /* Animation */
    yield* waitFor(4.0);
    yield blue_opacity(0.0, 2.0);
    yield blue_spacing_opacity(0.0, 2.0);

    yield* waitFor(1.0);
    yield green_spacing_opacity(1.0, 2.0);
    yield* green_opacity(1.0, 2.0);
    yield* waitFor(4.0);

    yield green_spacing_opacity(0.0, 2.0);
    yield blue_opacity(1.0, 2.0);
    yield* waitFor(8.0);
    
    yield green_opacity(0.0, 2.0);
    yield* blue_spacing_opacity(1.0, 2.0);
});
