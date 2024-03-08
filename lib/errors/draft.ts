import { ControlledError } from 'lib/types/controlled-error';

export type ControlledDraftErrorCode = ControlledError<keyof typeof ErrorCodes>;

export const isDraftErrorCode = <T>(error: unknown): error is T => {
  return error instanceof Error && error.message in ErrorCodes;
};

export const ErrorCodes = {
  FAILED_DRAFT_CONTENT_UPDATE: 'FAILED_DRAFT_CONTENT_UPDATE',
  FAILED_DRAFT_CREATION: 'FAILED_DRAFT_CREATION',
  FAILED_ALL_DRAFTS_RETRIEVAL: 'FAILED_ALL_DRAFTS_RETRIEVAL',
  FAILED_DRAFT_CONTENT_RETRIEVAL: 'FAILED_DRAFT_CONTENT_RETRIEVAL',
  NO_DRAFT_FOUND: 'NO_DRAFT_FOUND',
  NO_USER_FOUND: 'NO_USER_FOUND',
  UNAUTHORIZED_USER: 'UNAUTHORIZED_USER',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export const ERROR_MESSAGES: Record<keyof typeof ErrorCodes, string> = {
  [ErrorCodes.FAILED_DRAFT_CREATION]:
    'An error ocurred while creating your draft. Please try again.',
  [ErrorCodes.FAILED_ALL_DRAFTS_RETRIEVAL]:
    'An error ocurred while retrieving your drafts. Please reload the page.',
  [ErrorCodes.FAILED_DRAFT_CONTENT_RETRIEVAL]:
    "An error ocurred while retrieving this draft's content. Please try again.",
  [ErrorCodes.FAILED_DRAFT_CONTENT_UPDATE]:
    'An error ocurred while updating the content of the draft. Please try again.',
  [ErrorCodes.NO_USER_FOUND]:
    'No registered user was found with the provided data. Please sign up.',
  [ErrorCodes.NO_DRAFT_FOUND]:
    'No draft with the provided ID was found. Please validate that data.',
  [ErrorCodes.UNAUTHORIZED_USER]:
    'You are not allowed to update this draft as you are not either the author or a collaborator.',
  [ErrorCodes.UNKNOWN_ERROR]: 'Something wrong occurred. Please try again later.',
};
