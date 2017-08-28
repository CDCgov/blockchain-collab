import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input:  'src/js/main.js',

    output: {
        file:   'build/js/dapp.js',
        format: 'iife',
        name:   'wonderVanillaDapp'
    },

    external: [ 'lib/web3.min' ],
    globals: { 'lib/web3.min': 'Web3' },

    sourcemap: 'inline',

    plugins: [
        eslint(),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs()
    ]
};