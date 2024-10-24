import { Circle, makeScene2D, Txt, View2D } from '@motion-canvas/2d';
import { BLACK, BLUE, DARK_BLUE, DARK_GREEN, GREEN, RED, WHITE, YELLOW } from '../../colors';
import { all, Color, createRef, createSignal, waitFor } from '@motion-canvas/core';
import { addLayeredGrid } from '../../functions/grid';
import { AABB, LINE_WIDTH, Vec2 } from '../../types';
import { addCascadedProbe, addProbe, addProbeHighlighted } from '../../functions/radiance-cascades';
import { addIndicatorLine, addIntersectionVectorInterval } from '../../functions/vector';

/* Sub-texel offset to bilinear interpolation weights */
const bilinear_weights = (ratio: Vec2): [number, number, number, number] => {
    return [
        (1.0 - ratio[0]) * (1.0 - ratio[1]),
        ratio[0] * (1.0 - ratio[1]),
        (1.0 - ratio[0]) * ratio[1],
        ratio[0] * ratio[1]
    ];
};

const bilinear_samples = (dest_center: Vec2, bilinear_size: Vec2): [number, number, number, number] => {
    /* Coordinate of the top-left bilinear probe when floored */
    const base_coord: Vec2 = [
        (dest_center[0] / bilinear_size[0]) - 0.5,
        (dest_center[1] / bilinear_size[1]) - 0.5
    ];

    const ratio: Vec2 = [ /* Sub-bilinear probe position */
        base_coord[0] % 1.0,
        base_coord[1] % 1.0
    ];

    return bilinear_weights(ratio);
};

/* Canvas = 640x640 */
export default makeScene2D(function* (view: View2D) {
    // Create your animations here
    // view.fill(BLACK);
    const grid_bb: AABB = [[-4 * 64, -4 * 64], [4 * 64, 4 * 64]];

    const hightlighted_pos: Vec2 = [1.5, 1.5];

    for (let y = -2; y < 2; y++) {
        for (let x = -2; x < 2; x++) {
            if (x == -1 && y == 0) {
                addProbeHighlighted(view, BLUE, "#2d2a24", [x * 150 + 75, y * 150 + 75], 4, 0.0, 64.0, [3, 3], true);
            } else {
                addProbeHighlighted(view, BLUE, "#2d2a24", [x * 150 + 75, y * 150 + 75], 4, 0.0, 64.0, [0, -1]);
            }
        }
    }

    const weights = bilinear_samples(hightlighted_pos, [2, 2]);
    
    for (let y = -1; y < 1; y++) {
        for (let x = -1; x < 1; x++) {
            const weight = weights[(1 - (x + 1)) + (y + 1) * 2];

            const weighted_color = Color.lerp(GREEN.toString(), "#3d3a34", weight);
            addProbeHighlighted(view, weighted_color, "#3d3a34", [x * 300 + 150, y * 300 + 150], 8, 64.0, 64.0 + 96.0, [6, 8], true);
        }
    }

    /* Animation */
});
