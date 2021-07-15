import replace from '@rollup/plugin-replace';

export default {
    input: 'server.js',
    output: {
        file: './build/bundle.min.js',
        format: 'iife',
        name: 'bundle',
    },
    plugins: [
        replace({
            preventAssignment: true,
        }),
    ],
};
