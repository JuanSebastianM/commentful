export const ErrorCodes = {
  CREDENTIALS_NOT_FOUND: 'CREDENTIALS_NOT_FOUND',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_EXISTS: 'USER_EXISTS',
  FAILED_ACCOUNT_CREATION: 'FAILED_ACCOUNT_CREATION',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export const ERROR_MESSAGES: Record<keyof typeof ErrorCodes, string> = {
  [ErrorCodes.CREDENTIALS_NOT_FOUND]: 'The email or password is incorrect',
  [ErrorCodes.INVALID_CREDENTIALS]: 'The email or password is incorrect',
  [ErrorCodes.USER_EXISTS]:
    'A user with this email already exists. Try signing in instead or use a different email.',
  [ErrorCodes.FAILED_ACCOUNT_CREATION]:
    'An error ocurred while creating your account. Please try again after validating the information provided.',
  [ErrorCodes.UNKNOWN_ERROR]: 'Something wrong occurred. Please try again later.',
};
