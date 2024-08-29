import { Line, PossibleCanvasStyle, View2D } from "@motion-canvas/2d";
import { AABB, Vec2 } from "../types";

type Color = PossibleCanvasStyle;

const addVector = (view: View2D, color: Color, line_width: number, origin: Vec2, vector: Vec2, length: number) => {
    const end_point: Vec2 = [
        origin[0] + vector[0] * length,
        origin[1] + vector[1] * length
    ];

    view.add(
        <Line
            points={[
                origin,
                end_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
            endArrow
        />,
    );
}

const intersection = (b: AABB, ro: Vec2, rd: Vec2): Vec2 => {
    let tmin = -1e30, tmax = 1e30;

    if (rd[0] != 0.0) {
        const tx1 = (b[0][0] - ro[0]) / rd[0];
        const tx2 = (b[1][0] - ro[0]) / rd[0];

        tmin = Math.max(tmin, Math.min(tx1, tx2));
        tmax = Math.min(tmax, Math.max(tx1, tx2));
    }

    if (rd[1] != 0.0) {
        const ty1 = (b[0][1] - ro[1]) / rd[1];
        const ty2 = (b[1][1] - ro[1]) / rd[1];

        tmin = Math.max(tmin, Math.min(ty1, ty2));
        tmax = Math.min(tmax, Math.max(ty1, ty2));
    }

    return [tmin, tmax]; /* tmax >= tmin = intersection */
}

const addIntersectionVector = (view: View2D, color: Color, line_width: number, origin: Vec2, vector: Vec2, aabb: AABB) => {
    const int = intersection(aabb, origin, vector);
    if (int[1] < int[0]) return; /* Do nothing if no intersection */
    
    const start_point: Vec2 = [
        origin[0] + vector[0] * int[0],
        origin[1] + vector[1] * int[0]
    ];
    const end_point: Vec2 = [
        origin[0] + vector[0] * int[1],
        origin[1] + vector[1] * int[1]
    ];

    view.add(
        <Line
            points={[
                start_point,
                end_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
            endArrow
        />,
    );
}

export { addVector, addIntersectionVector };
