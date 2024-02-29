export const ErrorCodes = {
  FAILED_DRAFT_CREATION: 'FAILED_DRAFT_CREATION',
  FAILED_DRAFTS_RETRIEVAL: 'FAILED_DRAFTS_RETRIEVAL',
  NO_USER_FOUND: 'NO_USER_FOUND',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export const ERROR_MESSAGES: Record<keyof typeof ErrorCodes, string> = {
  [ErrorCodes.FAILED_DRAFT_CREATION]:
    'An error ocurred while creating your draft. Please try again.',
  [ErrorCodes.FAILED_DRAFTS_RETRIEVAL]:
    'An error ocurred while retrieving your drafts. Please reload the page.',
  [ErrorCodes.NO_USER_FOUND]:
    'No registered user was found with the provided data. Please sign up.',
  [ErrorCodes.UNKNOWN_ERROR]: 'Something wrong occurred. Please try again later.',
};
