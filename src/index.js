import Duck from './lib/Duck';

function duck(projectName, dir, outputPath) {
  return new Duck(projectName, dir, outputPath);
}

export default duck;
