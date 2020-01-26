module.exports = {
  plugins: ["@babel/plugin-proposal-class-properties"],
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: [
            "last 2 Firefox versions",
            "last 2 Chrome versions",
            "last 2 Edge versions",
            "last 2 Safari versions"
          ]
        }
      }
    ]
  ]
};
