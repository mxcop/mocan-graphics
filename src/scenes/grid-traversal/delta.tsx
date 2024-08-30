import { Circle, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { addLayeredGrid } from '../../functions/grid';
import { addIntersectionVector, addIntersectionVectorInterval, addInterval, addVector, getIntersectionPoint } from '../../functions/vector';
import { AABB, LINE_WIDTH, Vec2 } from '../../types';
import { BLUE, DARK_YELLOW, WHITE, YELLOW } from '../../colors';
import { addText } from '../../functions/text';

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    const line_width = LINE_WIDTH * 0.75;

    /* Grid */
    addLayeredGrid(view, ["#342c28", "#3d3a34"], line_width, [-4 * 64, -4 * 64], [64, 64], [8, 8]);
    view.add(
        <Txt text={"0,0"} position={[-4 * 64 + 29, -4 * 64 + 32]} fill={"#3d3a34"} stroke={"#3d3a34"} lineJoin={'round'} lineWidth={1.0} strokeFirst={true} letterSpacing={-6.0} fontFamily={'JetBrains Mono'} fontSize={36} fontWeight={900} />
    );

    const point: Vec2 = [0, 32];
    const grid_bb: AABB = [[-4 * 64, -4 * 64], [4 * 64, 4 * 64]];
    const angle = Math.atan2(-0.33, 1) * 57.2958;

    /* Delta Y */
    addIntersectionVectorInterval(view, WHITE, line_width, point, [1, -0.33], grid_bb, [160, -160], -32);

    const int_y_point: Vec2 = getIntersectionPoint(point, [1, -0.33], grid_bb, 0.5, -72);
    view.add(
        <Txt text={"delta_y"} position={int_y_point} rotation={angle} fill={WHITE} stroke={WHITE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
    );

    addInterval(view, YELLOW, line_width, [-192, 0], [-192, 64]);

    /* Delta X */
    addIntersectionVectorInterval(view, WHITE, line_width, point, [1, -0.33], grid_bb, [192, -257], 32);

    const int_x_point: Vec2 = getIntersectionPoint(point, [1, -0.33], grid_bb, 0.4375, 64);
    view.add(
        <Txt text={"delta_x"} position={int_x_point} rotation={angle} fill={WHITE} stroke={WHITE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
    );

    addInterval(view, YELLOW, line_width, [-64, 192], [0, 192]);

    /* Ray */
    addIntersectionVector(view, DARK_YELLOW, line_width, point, [1, -0.33], grid_bb);
});
