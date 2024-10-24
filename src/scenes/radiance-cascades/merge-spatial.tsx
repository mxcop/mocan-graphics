import { Circle, makeScene2D, Rect, Txt, View2D } from '@motion-canvas/2d';
import { BLACK, BLUE, DARK_BLUE, DARK_GREEN, GREEN, RED, WHITE, YELLOW } from '../../colors';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';
import { addLayeredGrid } from '../../functions/grid';
import { LINE_WIDTH, Vec2 } from '../../types';
import { addCascadedProbe, addProbe } from '../../functions/radiance-cascades';

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);

    view.add(
        <>
        {/* Bilinear probes */}
        <Rect
            position={[128, 128]}
            size={[256, 256]}
            lineWidth={LINE_WIDTH}
            stroke={GREEN}
        />
        <Txt text={"w: 0.5"} position={[128, 196]} fill={DARK_GREEN} stroke={DARK_GREEN} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
        <Rect
            position={[-128, 128]}
            size={[256, 256]}
            lineWidth={LINE_WIDTH}
            stroke={GREEN}
        />
        <Txt text={"w: 1.0"} position={[-128, 196]} fill={DARK_GREEN} stroke={DARK_GREEN} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
        <Rect
            position={[128, -128]}
            size={[256, 256]}
            lineWidth={LINE_WIDTH}
            stroke={GREEN}
        />
        <Txt text={"w: 0.25"} position={[128, -64]} fill={DARK_GREEN} stroke={DARK_GREEN} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
        <Rect
            position={[-128, -128]}
            size={[256, 256]}
            lineWidth={LINE_WIDTH}
            stroke={GREEN}
        />
        <Txt text={"w: 0.5"} position={[-128, -64]} fill={DARK_GREEN} stroke={DARK_GREEN} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
        {/* Probe */}
        <Rect
            position={[-64, 64]}
            size={[128, 128]}
            lineWidth={LINE_WIDTH}
            stroke={BLUE}
        />
        <Txt text={"P"} position={[-64, 64]} fill={DARK_BLUE} stroke={DARK_BLUE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
        </>,
    )

    /* Animation */

});
