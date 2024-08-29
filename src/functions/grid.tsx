import { Line, PossibleCanvasStyle, View2D } from "@motion-canvas/2d";
import { Vec2 } from "../types";

type Color = PossibleCanvasStyle;

const addSmallGrid = (view: View2D, color: Color, line_width: number, origin: Vec2, cell_size: Vec2, grid_size: Vec2) => {
    /* Draw the Y axis lines */
    for (let x = 0; x < grid_size[0] + 1; x++) {

        const start_point: Vec2 = [
            origin[0] + (x * cell_size[0]),
            origin[1]
        ];
        const end_point: Vec2 = [
            origin[0] + (x * cell_size[0]),
            origin[1] + (grid_size[1] * cell_size[1])
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
            />,
        );
    }

    /* Draw the X axis lines */
    for (let y = 0; y < grid_size[1] + 1; y++) {

        const start_point: Vec2 = [
            origin[0],
            origin[1] + (y * cell_size[1])
        ];
        const end_point: Vec2 = [
            origin[0] + (grid_size[0] * cell_size[0]),
            origin[1] + (y * cell_size[1])
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
            />,
        );
    }
}

const addLayeredGrid = (view: View2D, colors: Color[], line_width: number, origin: Vec2, cell_size: Vec2, grid_size: Vec2) => {
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const interval = (1 << i);

        /* Draw the Y axis lines */
        for (let x = 0; x < grid_size[0] + 1; x++) {
            if (x % interval != 0) continue;

            const start_point: Vec2 = [
                origin[0] + (x * cell_size[0]),
                origin[1]
            ];
            const end_point: Vec2 = [
                origin[0] + (x * cell_size[0]),
                origin[1] + (grid_size[1] * cell_size[1])
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
                />,
            );
        }

        /* Draw the X axis lines */
        for (let y = 0; y < grid_size[1] + 1; y++) {
            if (y % interval != 0) continue;

            const start_point: Vec2 = [
                origin[0],
                origin[1] + (y * cell_size[1])
            ];
            const end_point: Vec2 = [
                origin[0] + (grid_size[0] * cell_size[0]),
                origin[1] + (y * cell_size[1])
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
                />,
            );
        }
    }
}

export { addSmallGrid, addLayeredGrid };
