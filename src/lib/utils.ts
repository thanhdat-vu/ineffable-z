export function stringToPathName(str: string) {
  return str.toLowerCase().replace("/", "or").replace(/\s+/g, "-");
}
