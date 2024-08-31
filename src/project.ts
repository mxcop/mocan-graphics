import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import grid from './scenes/grid?scene';
import step from './scenes/grid-traversal/step?scene';
import delta from './scenes/grid-traversal/delta?scene';
import walk from './scenes/grid-traversal/walk?scene';
import tmax from './scenes/grid-traversal/tmax?scene';
import entry from './scenes/grid-traversal/entry?scene';
import angular from './scenes/radiance-cascades/angular?scene';

export default makeProject({
  scenes: [angular],
});
