import { makeScene2D, View2D } from '@motion-canvas/2d';
import { LINE_WIDTH } from '../types';
import { addLayeredGrid } from '../functions/grid';
import { addIntersectionVector, addVector } from '../functions/vector';
import { BLUE, YELLOW } from '../colors';

export default makeScene2D(function* (view: View2D) {
    addLayeredGrid(view, ["#342c28", "#3d3a34"], LINE_WIDTH / 2.0, [-4 * 64, -4 * 64], [64, 64], [8, 8]);

    addVector(view, YELLOW, LINE_WIDTH, [0, 0], [1, 1], 100.0);

    addIntersectionVector(view, BLUE, LINE_WIDTH, [0, 128], [1, 0.5], [[-4 * 64, -4 * 64], [4 * 64, 4 * 64]]);
});
