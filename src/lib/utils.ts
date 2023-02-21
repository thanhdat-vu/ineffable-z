export function stringToPathName(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}
