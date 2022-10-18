// Core
import merge from "webpack-merge";

// Configurations
import { getCommonConfig } from "./webpack.common";

// Modules
import * as modules from "../modules";

export const getProdConfig = () => {
  return merge(
    getCommonConfig({
      entry: {
        index: "./src/index.ts",
      },
    }),
    {
      mode: "none", // none to remove bundle chunk size warning
      devtool: false,
    },
    modules.cleanDirectories(),
    modules.connectBuildProgressIndicator(),
    modules.loadProdCss(),
    modules.loadImagesProd(),
    modules.loadFontsProd()
  );
};
