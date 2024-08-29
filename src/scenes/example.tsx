import { Circle, Grid, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { addCascadedProbe, addProbe } from '../functions/radiance-cascades';
import { BLACK, BLUE, DARK_BLUE, DARK_GREEN, GRAY, GREEN, RED, WHITE } from '../colors';
import { all, createRef } from '@motion-canvas/core';
import { addLayeredGrid, addSmallGrid } from '../functions/grid';
import { LINE_WIDTH } from '../types';

export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);

    const colors = [GREEN, BLUE, DARK_BLUE];

    // addCascadedProbe(view, [-650, 0], {
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

    addLayeredGrid(view, ["#342c28", "#3d3a34"], LINE_WIDTH / 2.0, [0, 0], [64, 64], [8, 8]);

    const myCircle = createRef<Circle>();
    view.add(
        <Circle
        ref={myCircle}
        // try changing these properties:
        x={-300}
        width={140}
        height={140}
        fill="#e13238"
        />,
    );
    
    yield* all(
        myCircle().position.x(300, 1).to(-300, 1),
        myCircle().fill('#e6a700', 1).to('#e13238', 1),
    );
});
