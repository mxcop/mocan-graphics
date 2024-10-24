import { Circle, Line, makeScene2D, PossibleCanvasStyle, Rect, Txt, View2D } from '@motion-canvas/2d';
import { BLACK, BLUE, DARK_BLUE, GRAY, GREEN, RED, WHITE, YELLOW } from '../../colors';
import { all, Color, createRef, createSignal, easeInOutCubic, tween, waitFor } from '@motion-canvas/core';
import { addLayeredGrid } from '../../functions/grid';
import { LINE_WIDTH, Vec2 } from '../../types';
import { addCascadedProbe, addProbe } from '../../functions/radiance-cascades';
import { RGBA_ASTC_10x10_Format } from 'three';

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);

    const interval3 = createRef<Line>();
    const blocking = createSignal(0.0);

    view.add(
        <>
        <Line
            points={[
                [-196 - 64, 0],
                [-128 - 8 - 64, 0]
            ]}
            stroke={BLUE}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
        />
        <Line
            points={[
                [-128 + 8 - 64, 0],
                [0 - 8 - 64, 0]
            ]}
            stroke={GREEN}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
        />
        <Line
            ref={interval3}
            points={[
                [0 + 8 - 64, 0],
                [256 - 64, 0]
            ]}
            stroke={RED}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
            endArrow={true}
            opacity={() => 1.0 - blocking()}
        />
        <Line
            ref={interval3}
            points={[
                [0 + 8 - 64, 0],
                [256 - 64, 0]
            ]}
            stroke={"#3d3a34"}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
            endArrow={true}
            opacity={blocking}
        />
        <Rect
            x={-128}
            size={[64, 96]}
            rotation={15}
            lineWidth={LINE_WIDTH}
            stroke={RED}
            fill={BLACK}
            opacity={blocking}
        />
        <Circle
            x={245}
            size={96}
            fill={YELLOW}
        />
        </>,
    );

    /* Animation */
    yield* waitFor(2.0);
    yield* blocking(1.0, 2.0);
    yield* waitFor(2.0);
    yield* blocking(0.0, 2.0);
});
