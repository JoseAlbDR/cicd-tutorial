import * as shell from 'shelljs';

// Copy all the view templates
shell.cp('-R', 'src/presentation/web/views', 'dist/presentation/web/views');
