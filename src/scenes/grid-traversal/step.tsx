import { Circle, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { addLayeredGrid } from '../../functions/grid';
import { addIntersectionVector, addVector } from '../../functions/vector';
import { LINE_WIDTH, Vec2 } from '../../types';
import { BLUE, WHITE, YELLOW } from '../../colors';
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

    /* Ray */
    addIntersectionVector(view, YELLOW, line_width, point, [1, -0.33], [[-4 * 64, -4 * 64], [4 * 64, 4 * 64]]);
    view.add(
        <Txt text={"step"} x={point[0] + 96} y={point[1] - 96} fill={WHITE} stroke={WHITE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
    );
    view.add(
        <Circle position={point} fill={WHITE} size={32.0} />
    );

    /* X axis arrow */
    addVector(view, WHITE, line_width, point, [1, 0], 128.0);
    view.add(
        <Txt text={"-1"} x={point[0] - 48} y={point[1] - 64} fill={WHITE} stroke={WHITE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
    );

    /* Y axis arrow */
    addVector(view, WHITE, line_width, point, [0, -1], 128.0);
    view.add(
        <Txt text={"1"} x={point[0] + 64} y={point[1] + 36} fill={WHITE} stroke={WHITE} lineJoin={'round'} lineWidth={1} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={900} />
    );
});
