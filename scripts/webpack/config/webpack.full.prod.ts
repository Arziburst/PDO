// Core
import merge from 'webpack-merge';

// Configurations
import { getCommonConfig } from './webpack.common';

// Modules
import * as modules from '../modules';

export const getFullProdConfig = () => {
    return merge(
        getCommonConfig(),
        {
            mode:    'none', // none to remove bundle chunk size warning
            devtool: false,
        },
        modules.cleanDirectories(),
        modules.loadImagesProd(),
        modules.loadProdCss(),
        modules.connectBuildProgressIndicator(),
        modules.optimizeBuild(true),
        modules.connectBundleAnalyzer(),
        modules.loadFontsProd(),
        modules.htmlMinimizer(),
    );
};
