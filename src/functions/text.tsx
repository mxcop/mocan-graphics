import { PossibleCanvasStyle, Txt, View2D } from "@motion-canvas/2d";
import { Vec2 } from "../types";
import { BLACK } from "../colors";

type Color = PossibleCanvasStyle;

const addText = (view: View2D, color: Color, origin: Vec2, text: string, outline: boolean = false) => {
    view.add(
        <Txt text={text} x={origin[0]} y={origin[1]} fill={color} stroke={BLACK} lineJoin={'round'} lineWidth={outline ? 24 : 0} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={40} fontWeight={800} />
    );
}

export { addText };
