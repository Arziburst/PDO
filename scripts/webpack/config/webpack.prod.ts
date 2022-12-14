// Core
import merge from 'webpack-merge';

// Configurations
import { getCommonConfig } from './webpack.common';

// Modules
import * as modules from '../modules';

export const getProdConfig = () => {
    return merge(
        getCommonConfig(),
        {
            mode:    'none', // none to remove bundle chunk size warning
            devtool: false,
        },
        modules.cleanDirectories(),
        modules.loadImagesProd(),
        modules.loadProdCssWithoutMini(),
        modules.connectBuildProgressIndicator(),
        modules.optimizeBuild(false),
        modules.connectBundleAnalyzer(),
        modules.loadFontsProd(),
    );
};
