uniform vec2 probe_size;
uniform vec2 size;

in vec2 tuv;

const float PI = 3.14159265;
const float TAU = 2.0 * PI;

void main() {
    vec2 pixel_coord = tuv * size;
    vec2 probe_coord = pixel_coord / probe_size;
    vec2 probe_index = floor(probe_coord);
    vec2 dir_index = fract(probe_coord);
    gl_FragColor = vec4(dir_index.x, dir_index.y, 0.0, 1.0);
}
