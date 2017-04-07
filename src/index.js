import Duck from './lib/Duck';

export default function duck(projectName, dir, outputPath) {
  return new Duck(projectName, dir, outputPath);
}
