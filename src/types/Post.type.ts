export type PostActions = 'hide' | 'share' | 'check';

export type CombinationVal = { id: string; value: string };

export type CombinationOriginVal = {
  [key: string]: CombinationVal[];
};

export type PostData = {
  action: PostActions;
  content: CombinationVal[];
};

export type PostFunc = {
  [key in PostActions]: (event: MessageEvent) => void;
};
