export type Vec2 = [number, number];

export type AABB = [Vec2, Vec2];

export const PI = 3.14;
export const TAU = PI * 2.0;

export const LINE_WIDTH = 12.0;

export const normalize = (v: Vec2): Vec2 => {
    const len = Math.sqrt((v[0] * v[0]) + (v[1] * v[1]));
    return [v[0] / len, v[1] / len];
};
