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

    // for (let y = -2; y < 2; y++) {
    //     for (let x = -2; x < 2; x++) {
    //         addProbe(view, BLUE, [x * 150 + 75, y * 150 + 75], 4, 0.0, 64.0);
    //     }
    // }

    for (let y = -1; y < 1; y++) {
        for (let x = -1; x < 1; x++) {
            addProbe(view, GREEN, [x * 300 + 150, y * 300 + 150], 8, 52.0, 52.0 + 100.0);
        }
    }

    /* Animation */

});
