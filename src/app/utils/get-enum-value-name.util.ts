/**
 * Gets the export enum value name.
 * @param enumType - The type of enum.
 * @param enumVal - The export enum value.
 * @return The export enum value String representation. (or -1 if not found)
 * @author Exchange4Free (Collen Simelane)
 */
export function getEnumValueName(enumType: any, enumVal: any): string | number {
  const enumIndexes = [];
  const enumNames = [];
  for (const enumValue in enumType) {
    if (isNaN(parseInt(enumValue, 10))) {
      enumNames.push(enumValue);
    } else {
      enumIndexes.push(enumValue);
    }
  }
  const index = enumIndexes.indexOf(enumVal.toString());
  return enumNames[index];
}
