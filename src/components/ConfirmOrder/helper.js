export function maskString(string, n) {
  if (typeof string !== "string" || typeof n !== "number" || n < 0) {
    throw new Error("Invalid arguments");
  }

  if (n >= string.length) {
    return string;
  }

  const stars = "*".repeat(string.length - n);
  const lastChars = string.slice(-n);

  return stars + lastChars;
}
