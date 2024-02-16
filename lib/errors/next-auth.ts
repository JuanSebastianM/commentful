export const ErrorCodes = {
  CREDENTIALS_NOT_FOUND: 'CREDENTIALS_NOT_FOUND',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
} as const;

export const ERROR_MESSAGES: Record<keyof typeof ErrorCodes, string> = {
  [ErrorCodes.CREDENTIALS_NOT_FOUND]: 'The email or password is incorrect',
  [ErrorCodes.INVALID_CREDENTIALS]: 'The email or password is incorrect',
};
