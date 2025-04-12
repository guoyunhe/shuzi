export interface ShuziOptions {
  lastNameUpperCase?: boolean;
}

export function shuzi(firstName: string, lastName: string, options?: ShuziOptions) {
  if (options?.lastNameUpperCase) {
    return `${firstName} ${lastName.toLocaleUpperCase()}`;
  }
  return `${firstName} ${lastName}`;
}
