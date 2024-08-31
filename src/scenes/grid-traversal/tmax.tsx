import { Circle, Line, makeScene2D, Rect, Txt, View2D } from '@motion-canvas/2d';
import { addLayeredGrid } from '../../functions/grid';
import { addIntersectionVector, addVectorMarker, getIntersectionPoint } from '../../functions/vector';
import { AABB, LINE_WIDTH, normalize, Vec2 } from '../../types';
import { DARK_BLUE, DARK_YELLOW, WHITE, YELLOW } from '../../colors';
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

    const int_cell = createSignal<Vec2>([-64, 0]);
    const cell_opacity = createSignal(0.5);
    view.add(
        <Rect position={int_cell} offset={[-1.0, -1.0]} width={64} height={64} stroke={DARK_BLUE} opacity={cell_opacity} lineWidth={line_width} radius={4} />
    );

    /* tmax X */
    const tmax_xt = createSignal(0.4975);
    const tmax_xp = createSignal(() => {
        return getIntersectionPoint(point, vector, grid_bb, tmax_xt(), 0);
    });
    const tmax_xtp = createSignal(() => {
        return getIntersectionPoint(point, vector, grid_bb, tmax_xt(), 60);
    });

    addVectorMarker(view, WHITE, line_width, tmax_xp, vector, 32);
    view.add(
        <Txt text={"tmax_x"} position={tmax_xtp} rotation={angle} fill={WHITE} stroke={WHITE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
    );

    /* tmax Y */
    const tmax_yt = createSignal(0.685);
    const tmax_yp = createSignal(() => {
        return getIntersectionPoint(point, vector, grid_bb, tmax_yt(), 0);
    });
    const tmax_ytp = createSignal(() => {
        return getIntersectionPoint(point, vector, grid_bb, tmax_yt(), -70);
    });

    addVectorMarker(view, WHITE, line_width, tmax_yp, vector, -32);
    view.add(
        <Txt text={"tmax_y"} position={tmax_ytp} rotation={angle} fill={WHITE} stroke={WHITE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
    );

    /* Ray */
    addIntersectionVector(view, DARK_YELLOW, line_width, point, vector, grid_bb);

    /* Current point & cell */
    const start_point: Vec2 = getIntersectionPoint(point, vector, grid_bb, 0.0, 0);
    const int_t = createSignal(0.375);
    const int_point = createSignal(() => {
        return getIntersectionPoint(point, vector, grid_bb, int_t(), 0);
    });
    view.add(
        <>
        <Line
            points={[
                start_point,
                int_point
            ]}
            stroke={YELLOW}
            lineWidth={line_width}
            lineCap={'round'}
        />
        <Circle position={int_point} fill={WHITE} size={32.0} />
        </>
    );
});
