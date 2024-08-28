import { Line, PossibleCanvasStyle, View2D } from "@motion-canvas/2d";
import { LINE_WIDTH, TAU, Vec2 } from "../types";

type Color = PossibleCanvasStyle;

/**
 * Add a probe to the view.
 * @param origin Center point of the probe.
 * @param dir_count Number of directions/intervals to draw.
 * @param tmin Interval start.
 * @param tmax Interval end.
 */
const addProbe = (view: View2D, color: Color, origin: Vec2, dir_count: number, tmin: number, tmax: number) => {
    for (let i = 0; i < dir_count; i++) {
        const angle = ((i + 0.5) / dir_count) * TAU;

        const start_point: Vec2 = [
            origin[0] + Math.cos(angle) * tmin, 
            origin[1] + Math.sin(angle) * tmin
        ];
        const end_point: Vec2 = [
            origin[0] + Math.cos(angle) * (tmax - LINE_WIDTH), 
            origin[1] + Math.sin(angle) * (tmax - LINE_WIDTH)
        ];

        view.add(
            <Line
                points={[
                    start_point,
                    end_point
                ]}
                stroke={color}
                lineWidth={LINE_WIDTH}
                lineCap={'round'}
            />,
        );
    }
}

/**
 * Add a forked probe to the view.
 * @param origin Center point of the probe.
 * @param dir_count Number of directions/intervals to draw.
 * @param tmin Interval start.
 * @param tmax Interval end.
 */
const addForkedProbe = (view: View2D, color: Color, origin: Vec2, dir_count: number, branch_factor: number, tmin: number, tmax: number) => {
    for (let i = 0; i < dir_count; i++) {
        const prev_angle = (((Math.floor(i / branch_factor) * branch_factor) + (branch_factor / 2.0)) / dir_count) * TAU;
        const angle = ((i + 0.5) / dir_count) * TAU;

        const start_point: Vec2 = [
            origin[0] + Math.cos(prev_angle) * tmin, 
            origin[1] + Math.sin(prev_angle) * tmin
        ];
        const end_point: Vec2 = [
            origin[0] + Math.cos(angle) * (tmax - LINE_WIDTH), 
            origin[1] + Math.sin(angle) * (tmax - LINE_WIDTH)
        ];

        view.add(
            <Line
                points={[
                    start_point,
                    end_point
                ]}
                stroke={color}
                lineWidth={LINE_WIDTH}
                lineCap={'round'}
            />,
        );
    }
}

export interface Cascades {
    /** Number of cascades. */
    count: number;
    /** The color of each cascade. */
    colors: Color[];
    /** Number of directions in cascade 0. */
    dir_count: number;
    /** Length of intervals in cascade 0. */
    interval_length: number;

    /** Branch factor of the cascades. (by how much the dir count increases with each cascade) */
    branch_factor: 2 | 4;

    /** Should the forking fix be used? */
    use_forking?: boolean;
};

const addCascadedProbe = (view: View2D, origin: Vec2, cascades: Cascades) => {
    const branch_factor = cascades.branch_factor / 2;

    for (let i = 0; i < cascades.count; i++) {
        const color: Color = cascades.colors[i];
        
        const tmin = cascades.interval_length * (i == 0 ? 0.0 : (1 << (branch_factor * i)));
        const tmax = cascades.interval_length * ((i + 1) == 0 ? 0.0 : (1 << (branch_factor * (i + 1))));

        const dir_count = cascades.dir_count << (branch_factor * i);

        if (cascades.use_forking) {
            addForkedProbe(view, color, origin, dir_count, cascades.branch_factor, tmin, tmax);
        } else {
            addProbe(view, color, origin, dir_count, tmin, tmax);
        }
    }
}

export { addProbe, addForkedProbe, addCascadedProbe };
