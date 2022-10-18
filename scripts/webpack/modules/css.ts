// Core
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
import path from 'path';
import glob from 'glob';

const loadCss = ({ sourceMap }: { sourceMap: boolean }) => ({
    loader:  'css-loader',
    options: {
        sourceMap,
    },
});

const loadSass = ({ sourceMap }: { sourceMap: boolean }) => ({
    loader:  'sass-loader',
    options: {
        sourceMap,
    },
});


const getPathsScssFiles = () => {
    let newEntry = {};

    glob.sync('./src/**/*.scss', {}).forEach((pathFile) => {
        const scriptName = path.parse(pathFile).name;
        const folder = pathFile.split('/').at(-2);
        newEntry = {
            ...newEntry,
            [ `${folder === 'src' ? '' : folder + '/'}${scriptName}` ]: `./${pathFile}`,
        };
    });

    return newEntry;
};

export const loadDevCss = (): Configuration => ({
    entry:  getPathsScssFiles(),
    module: {
        rules: [
            {
                test: /\.css|.scss|.sass$/,
                use:  [
                    'style-loader',
                    loadCss({ sourceMap: false }),
                    'resolve-url-loader',
                    loadSass({ sourceMap: true }),
                ],
            },
        ],
    },
});

export const loadProdCss = (): Configuration => ({
    entry:  getPathsScssFiles(),
    module: {
        rules: [
            {
                test: /\.css|.scss|.sass$/,
                use:  [
                    MiniCssExtractPlugin.loader,
                    loadCss({ sourceMap: false }),
                    'resolve-url-loader',
                    loadSass({ sourceMap: true }),
                ],
            },
        ],
    },
    plugins: [
        new RemoveEmptyScriptsPlugin({ verbose: false }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:3].css',
        }),
    ],
});
