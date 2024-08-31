import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import grid from './scenes/grid?scene';
import step from './scenes/grid-traversal/step?scene';
import delta from './scenes/grid-traversal/delta?scene';
import walk from './scenes/grid-traversal/walk?scene';

export default makeProject({
  scenes: [walk],
});
