/**
 * Format string to Label / Display.
 * @sample first_year -> First Year
 * @sample another_example_string -> Another Example String
 */
export const formatToLabel = (input: string | null | undefined) => {
  if (!input) {
    return "";
  }

  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Format string to ID.
 * @sample Date of Birth -> date_of_birth
 * @sample Pag-ibig -> pag_ibig
 */
export const formatToId = (input: string) => input.replace(/[\s-]+/g, "_").toLowerCase();
