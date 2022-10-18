// Core
import merge from "webpack-merge";

// Constants
import { BUILD_DIRECTORY } from "../constants";

// Modules
import * as modules from "../modules";

// Types
import { EntryObject } from "webpack";
type Entry = {
  entry:
    | string
    | string[]
    | (() =>
        | string
        | string[]
        | EntryObject
        | Promise<string | string[] | EntryObject>)
    | EntryObject;
};

export const getCommonConfig = (entry: Entry) => {
  return merge(
    {
      ...entry,
      output: {
        path: BUILD_DIRECTORY,
        filename: "js/[name].[chunkhash].js",
        publicPath: "/",
        assetModuleFilename: "assets/[name][ext]",
        hashDigestLength: 3,
      },
      resolve: {
        extensions: [".ts", ".js"],
      },
    },
    modules.loadTypeScript(),
    modules.loadHandlebars(),
    modules.defineEnvVariables(),
    modules.connectHtml()
  );
};
