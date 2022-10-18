// Core
import merge from "webpack-merge";

// Configurations
import { getCommonConfig } from "./webpack.common";

// Modules
import * as modules from "../modules";

export const getDevConfig = () => {
  return merge(
    getCommonConfig({
      entry: {
        index: "./src/index.ts",
      },
    }),
    {
      mode: "development",
      devtool: "eval-cheap-module-source-map",
      stats: "none",
    },
    modules.loadImagesDev(),
    modules.loadDevCss(),
    modules.loadFontsDev()
  );
};
