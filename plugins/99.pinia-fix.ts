import { shouldHydrate } from 'pinia';

export default definePayloadPlugin(() => {
  definePayloadReducer('skipHydrate', (data: any) => {
    try {
      return !shouldHydrate(data) && 1;
    } catch {
      return false;
    }
  });
});
