import type { CombinationVal, PostActions } from '../../../types/Post.type';

export const postMessageToParent = (action: PostActions, content: CombinationVal[]) => {
  window.parent.postMessage({ action, content }, '*');
};
