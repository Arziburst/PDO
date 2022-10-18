// Core
import merge from 'webpack-merge';

// Configurations
import { getCommonConfig } from './webpack.common';

// Constants
import { SOURCE_DIRECTORY } from '../constants';

// Modules
import * as modules from '../modules';

export const getFullProdConfig = () => {
    return merge(
        getCommonConfig({
            entry: [ SOURCE_DIRECTORY ],
        }),
        {
            mode:    'none', // none to remove bundle chunk size warning
            devtool: false,
        },
        modules.cleanDirectories(),
        modules.loadImagesProd(),
        modules.loadFullProdCss(),
        modules.connectBuildProgressIndicator(),
        modules.optimizeFullBuild(),
        modules.connectBundleAnalyzer(),
        modules.loadFontsProd(),
        modules.htmlMinimizer(),
    );
};
