// Utility functions for consistent styling
export const spacing = (multiplier = 1) => multiplier * 8;
export const borderRadius = () => 12;
export const getColor = (colorKey) => `var(${colorKey})`;

export default {
  spacing,
  borderRadius,
  getColor,
};

