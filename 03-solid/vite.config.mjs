import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      [
        "src/http/controllers/**",
        "./prisma/vitest-prisma-environment/prisma-test-environment.ts",
      ],
    ],
    dir: "src",
  },
});
