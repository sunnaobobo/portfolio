import axios from 'axios';

import type {
  ContentType,
  ReactionType,
  ShareType,
} from '@/generated/prisma/enums';
import type { TApiResponse } from '@/types';

export const postReaction = async ({
  slug,
  contentType,
  contentTitle,
  type,
  count,
  section,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  type: ReactionType;
  count: number;
  section: string;
}) => {
  try {
    await axios.post<TApiResponse>(`/api/reactions/${slug}`, {
      contentType,
      contentTitle,
      type,
      count,
      section,
    });
  } catch {
    //
  }
};

export const postShare = async ({
  slug,
  contentType,
  contentTitle,
  type,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  type: ShareType;
}) => {
  try {
    await axios.post<TApiResponse>(`/api/shares/${slug}`, {
      contentType,
      contentTitle,
      type,
    });
  } catch {
    //
  }
};

export const postView = async ({
  slug,
  contentType,
  contentTitle,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
}) => {
  try {
    await axios.post<TApiResponse>(`/api/views/${slug}`, {
      contentType,
      contentTitle,
    });
  } catch {
    //
  }
};
