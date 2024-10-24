import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import grid from './scenes/grid?scene';
import step from './scenes/grid-traversal/step?scene';
import delta from './scenes/grid-traversal/delta?scene';
import walk from './scenes/grid-traversal/walk?scene';
import tmax from './scenes/grid-traversal/tmax?scene';
import entry from './scenes/grid-traversal/entry?scene';
import angular from './scenes/radiance-cascades/angular?scene';
import spatial from './scenes/radiance-cascades/spatial?scene';
import split from './scenes/radiance-cascades/split?scene';
import incsplit from './scenes/radiance-cascades/inc-split?scene';
import expspatial from './scenes/radiance-cascades/exploit-spatial?scene';
import cascade from './scenes/radiance-cascades/cascade?scene';
import cascademem from './scenes/radiance-cascades/cascade-mem?scene';
import cascadeprobe from './scenes/radiance-cascades/cascade-probe?scene';
import mergeintervals from './scenes/radiance-cascades/merge-intervals?scene';
import mergecones from './scenes/radiance-cascades/merge-cones?scene';
import mergespatial from './scenes/radiance-cascades/merge-spatial?scene';
import cascadecrown from './scenes/radiance-cascades/cascade-crown?scene';
import mergecombined from './scenes/radiance-cascades/merge-combined?scene';

export default makeProject({
  scenes: [mergecombined],
});
