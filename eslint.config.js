module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/no-unknown-property': [
      "error", { 
        ignore: [
          "geometry",
          "position",
          "rotation",
          "scale",
          "map",
          "matcap",
          "transparent",
          "toneMapped",
          "object",
          "material",
          "skeleton",
          "args",
          "alphaMap",
          "dispose",
          "frustumCulled",
          "rotation-x",
          "matrixAutoUpdate",
          "uniforms",
          "fragmentShader",
          "vertexShader",
          "uPerlinTexture",
          "uJumpyPerlinTexture",
          "uPerlinTextureVertical",
          "uJumpyPerlinTextureVertical",
          "visible",
        ] 
      }
    ],
  },
}
