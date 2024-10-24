import { Line, PossibleCanvasStyle, Txt, View2D } from "@motion-canvas/2d";
import { AABB, normalize, Vec2 } from "../types";
import { createSignal, SignalValue, SimpleSignal, unwrap } from "@motion-canvas/core";

type Color = PossibleCanvasStyle;

/**
 * Draw a vector with an arrow.
 */
const addVector = (view: View2D, color: Color, line_width: number, origin: Vec2, vector: SignalValue<Vec2>, length: number) => {

    const end_point = createSignal<Vec2>(() => { 
        const p = unwrap(vector);
        return [
            origin[0] + p[0] * length,
            origin[1] + p[1] * length
        ];
    });

    view.add(
        <Line
            points={() => [
                origin,
                end_point()
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
            arrowSize={line_width * 2.0}
            endArrow
        />,
    );
}

/**
 * Draw a line from A to B with lines indicating the ends.
 */
const addIndicatorLine = (view: View2D, color: Color, line_width: number, a: Vec2, b: Vec2, offset: number, opacity: SignalValue<number> = 1.0) => {
    const vector: Vec2 = normalize([
        b[0] - a[0],
        b[1] - a[1]
    ]);

    const normal: Vec2 = [
        -vector[1],
        vector[0]
    ];

    const start_point: Vec2 = a;
    const end_point: Vec2 = b;
    
    const start_offset_point: Vec2 = [
        start_point[0] + normal[0] * offset,
        start_point[1] + normal[1] * offset
    ];
    const end_offset_point: Vec2 = [
        end_point[0] + normal[0] * offset,
        end_point[1] + normal[1] * offset
    ];

    view.add(
        <Line
            points={[
                start_offset_point,
                end_offset_point
            ]}
            stroke={color}
            opacity={opacity}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );

    view.add(
        <Line
            points={[
                start_point,
                start_offset_point
            ]}
            stroke={color}
            opacity={opacity}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );
    view.add(
        <Line
            points={[
                end_point,
                end_offset_point
            ]}
            stroke={color}
            opacity={opacity}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );
}

/**
 * Draw a marker at a point on a vector / line.
 */
const addVectorMarker = (view: View2D, color: Color, line_width: number, point: SignalValue<Vec2>, vector: Vec2, offset: number = 32) => {
    const normal: Vec2 = [
        -vector[1],
        vector[0]
    ];

    const center_point = createSignal<Vec2>(() => { 
        const p = unwrap(point);
        return [
            p[0] + normal[0] * offset,
            p[1] + normal[1] * offset
        ];
    });

    view.add(
        <Line
            points={[
                point,
                center_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );

    const left_point = createSignal<Vec2>(() => { 
        const p = center_point();
        return [
            p[0] - vector[0] * line_width * 1.5,
            p[1] - vector[1] * line_width * 1.5
        ];
    });
    const right_point = createSignal<Vec2>(() => { 
        const p = center_point();
        return [
            p[0] + vector[0] * line_width * 1.5,
            p[1] + vector[1] * line_width * 1.5
        ];
    });

    view.add(
        <Line
            points={[
                left_point,
                right_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );
}

/**
 * Draw an interval from start to end with lines at the start and end.
 */
const addInterval = (view: View2D, color: Color, line_width: number, start: Vec2, end: Vec2) => {
    const vector: Vec2 = normalize([
        end[0] - start[0],
        end[1] - start[1]
    ]);

    /* Main line */
    view.add(
        <Line
            points={[
                start,
                end
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );

    /* Ends */
    const normal: Vec2 = [
        -vector[1],
        vector[0]
    ];

    const start_top_point: Vec2 = [
        start[0] + normal[0] * line_width * 1.5,
        start[1] + normal[1] * line_width * 1.5
    ];
    const start_bottom_point: Vec2 = [
        start[0] - normal[0] * line_width * 1.5,
        start[1] - normal[1] * line_width * 1.5
    ];

    view.add(
        <Line
            points={[
                start_top_point,
                start_bottom_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );

    const end_top_point: Vec2 = [
        end[0] + normal[0] * line_width * 1.5,
        end[1] + normal[1] * line_width * 1.5
    ];
    const end_bottom_point: Vec2 = [
        end[0] - normal[0] * line_width * 1.5,
        end[1] - normal[1] * line_width * 1.5
    ];

    view.add(
        <Line
            points={[
                end_top_point,
                end_bottom_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
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

/**
 * Draw the vector from intersection tmin to tmax.
 */
const addIntersectionVector = (view: View2D, color: Color, line_width: number, origin: Vec2, vector: Vec2, aabb: AABB, padding: number = 0.0) => {
    const int = intersection(aabb, origin, vector);
    if (int[1] < int[0]) return; /* Do nothing if no intersection */
    
    const start_point: Vec2 = [
        origin[0] + vector[0] * (int[0] + padding),
        origin[1] + vector[1] * (int[0] + padding)
    ];
    const end_point: Vec2 = [
        origin[0] + vector[0] * (int[1] - padding),
        origin[1] + vector[1] * (int[1] - padding)
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
            arrowSize={line_width * 2.0}
            endArrow
        />,
    );
}

/**
 * Draw the vector from intersection tmin + interval.x to tmax + interval.y.
 * With an optional offset from the origional vector.
 */
const addIntersectionVectorInterval = (view: View2D, color: Color, line_width: number, origin: Vec2, vector: Vec2, aabb: AABB, interval: Vec2, offset: number) => {
    const int = intersection(aabb, origin, vector);
    if (int[1] < int[0]) return; /* Do nothing if no intersection */

    const normal: Vec2 = [
        -vector[1],
        vector[0]
    ];

    const start_point: Vec2 = [
        origin[0] + vector[0] * (int[0] + interval[0]),
        origin[1] + vector[1] * (int[0] + interval[0])
    ];
    const end_point: Vec2 = [
        origin[0] + vector[0] * (int[1] + interval[1]),
        origin[1] + vector[1] * (int[1] + interval[1])
    ];
    
    const start_offset_point: Vec2 = [
        start_point[0] + normal[0] * offset,
        start_point[1] + normal[1] * offset
    ];
    const end_offset_point: Vec2 = [
        end_point[0] + normal[0] * offset,
        end_point[1] + normal[1] * offset
    ];

    view.add(
        <Line
            points={[
                start_offset_point,
                end_offset_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );

    view.add(
        <Line
            points={[
                start_point,
                start_offset_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );
    view.add(
        <Line
            points={[
                end_point,
                end_offset_point
            ]}
            stroke={color}
            lineWidth={line_width}
            lineCap={'round'}
        />,
    );
}

/**
 * Get the intersection point between a ray and AABB, with optional time and offset.
 */
const getIntersectionPoint = (origin: Vec2, vector: Vec2, aabb: AABB, time: number = 0.0, offset: number = 0.0): Vec2 => {
    const int = intersection(aabb, origin, vector);
    if (int[1] < int[0]) return origin; /* Do nothing if no intersection */

    const normal: Vec2 = [
        -vector[1],
        vector[0]
    ];

    const start_point: Vec2 = [
        origin[0] + vector[0] * int[0] + normal[0] * offset,
        origin[1] + vector[1] * int[0] + normal[1] * offset
    ];
    const end_point: Vec2 = [
        origin[0] + vector[0] * int[1] + normal[0] * offset,
        origin[1] + vector[1] * int[1] + normal[1] * offset
    ];

    const pos: Vec2 = [
        start_point[0] + (end_point[0] - start_point[0]) * time,
        start_point[1] + (end_point[1] - start_point[1]) * time
    ];

    return pos;
}

export { addVector, addIndicatorLine, addVectorMarker, addInterval, addIntersectionVector, addIntersectionVectorInterval, getIntersectionPoint };
