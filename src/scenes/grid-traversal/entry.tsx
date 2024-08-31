import { Circle, Line, makeScene2D, Rect, Txt, View2D } from '@motion-canvas/2d';
import { addLayeredGrid } from '../../functions/grid';
import { addIntersectionVector, addVectorMarker, getIntersectionPoint } from '../../functions/vector';
import { AABB, LINE_WIDTH, normalize, Vec2 } from '../../types';
import { DARK_BLUE, DARK_YELLOW, GRAY, WHITE, YELLOW } from '../../colors';
import { all, createSignal, waitFor } from '@motion-canvas/core';

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    const line_width = LINE_WIDTH * 0.75;

    /* Grid */
    addLayeredGrid(view, ["#342c28", "#3d3a34"], line_width, [-4 * 64, -4 * 64], [64, 64], [8, 8]);
    view.add(
        <Txt text={"0,0"} position={[-4 * 64 + 29, -4 * 64 + 32]} fill={"#3d3a34"} stroke={"#3d3a34"} lineJoin={'round'} lineWidth={1.0} strokeFirst={true} letterSpacing={-6.0} fontFamily={'JetBrains Mono'} fontSize={36} fontWeight={900} />
    );

    const point: Vec2 = [0, 32];
    const vector: Vec2 = normalize([1, -0.33]);
    const angle = Math.atan2(vector[1], vector[0]) * 57.2958;
    const grid_bb: AABB = [[-4 * 64, -4 * 64], [4 * 64, 4 * 64]];

    const int_cell = createSignal<Vec2>([0, 0]);
    view.add(
        <>
        <Line points={[
                [0, 0],
                [256, 0]
            ]}
            stroke={"#686972"}
            lineWidth={line_width}
            lineCap={'round'} />
        <Line points={[
                [0, 0],
                [0, 256]
            ]}
            stroke={"#686972"}
            lineWidth={line_width}
            lineCap={'round'} />
        <Txt text={"object"} position={[128, 128-6]} fill={"#686972"} stroke={"#686972"} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
        </>
    );

    /* Ray */
    addIntersectionVector(view, DARK_YELLOW, line_width, point, vector, grid_bb);

    /* Current point & cell */
    const start_point: Vec2 = getIntersectionPoint(point, vector, grid_bb, 0.0, 0);
    const int_point = createSignal(getIntersectionPoint(point, vector, grid_bb, 0.5, 0));
    const cell_opacity = createSignal(0.0);
    view.add(
        <>
        <Line
            points={[
                start_point,
                int_point()
            ]}
            stroke={YELLOW}
            lineWidth={line_width}
            lineCap={'round'}
        /> 
        <Rect position={int_cell} offset={[-1.0, -1.0]} width={64} height={64} stroke={DARK_BLUE} opacity={cell_opacity} lineWidth={line_width} radius={4} />
        <Txt text={"entry"} position={[32, -48]} fill={DARK_BLUE} stroke={DARK_BLUE} lineJoin={'round'} opacity={cell_opacity} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
        <Circle position={int_point} fill={WHITE} size={32.0} />
        </>
    );

    /* Animation */
    yield int_point([0, 0], 2.0);
    yield* cell_opacity(1.0, 2.0);

    yield* waitFor(2.0);

    /* Reset */
    yield int_point(getIntersectionPoint(point, vector, grid_bb, 0.5, 0), 2.0);
    yield* cell_opacity(0.0, 2.0);
});
