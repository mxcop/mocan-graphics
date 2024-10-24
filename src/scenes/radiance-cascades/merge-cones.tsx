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

    const origin: Vec2 = [-260+32, 0];
    const get_point = (angle: number, time: number): Vec2 => {
        return [
            origin[0] + Math.cos(angle) * time,
            origin[1] + Math.sin(angle) * time
        ];
    };

    view.add(
        <>
        {/* Cone */}
        <Line
            ref={interval3}
            points={[
                [get_point(0.35, 0)[0] - 64, get_point(0.35, 0)[1]],
                [get_point(0.35, 800)[0] - 64, get_point(0.35, 800)[1]],
            ]}
            stroke={"#3d3a34"}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
            lineDash={[32, 48]}
        />
        <Line
            ref={interval3}
            points={[
                [get_point(-0.35, 0)[0] - 64, get_point(-0.35, 0)[1]],
                [get_point(-0.35, 800)[0] - 64, get_point(-0.35, 800)[1]],
            ]}
            stroke={"#3d3a34"}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
            lineDash={[32, 48]}
        />
        {/* Intervals */}
        <Line
            points={[
                origin,
                get_point(0.0, 64 - 8)
            ]}
            stroke={BLUE}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
        />
        <Line
            points={[
                get_point(0.2, 64 + 8),
                get_point(0.2, 64 + 128 - 8)
            ]}
            stroke={GREEN}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
        />
        <Line
            points={[
                get_point(-0.2, 64 + 8),
                get_point(-0.2, 64 + 128 - 8)
            ]}
            stroke={GREEN}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
        />
        <Line
            ref={interval3}
            points={[
                get_point(-0.3, 64 + 128 + 8),
                get_point(-0.3, 64 + 128 + 256)
            ]}
            stroke={RED}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
            endArrow={true}
        />
        <Line
            ref={interval3}
            points={[
                get_point(-0.1, 64 + 128 + 8),
                get_point(-0.1, 64 + 128 + 256)
            ]}
            stroke={RED}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
            endArrow={true}
        />
        <Line
            ref={interval3}
            points={[
                get_point(0.1, 64 + 128 + 8),
                get_point(0.1, 64 + 128 + 256)
            ]}
            stroke={RED}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
            endArrow={true}
        />
         <Line
            ref={interval3}
            points={[
                get_point(0.3, 64 + 128 + 8),
                get_point(0.3, 64 + 128 + 256)
            ]}
            stroke={RED}
            lineWidth={LINE_WIDTH}
            lineCap={'round'}
            endArrow={true}
        />
        </>,
    );

    /* Animation */
});
