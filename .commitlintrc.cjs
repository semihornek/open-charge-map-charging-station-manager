module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Define your custom rules here
    "type-enum": [2, "always", ["feat", "fix", "chore", "docs", "style", "refactor", "perf", "test"]],
    "subject-case": [0],
  },
};
