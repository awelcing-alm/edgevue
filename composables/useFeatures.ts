import { ref } from 'vue';

export function useFeatures() {
  const cachedFeatures = ref(new Map<string, any>());

  async function fetchFeature(featureId: string) {
    if (cachedFeatures.value.has(featureId)) {
      return cachedFeatures.value.get(featureId); // Return from cache
    }
    const { data } = await useFetch(`/zephr/features/${featureId}`);
    cachedFeatures.value.set(featureId, data?.value); // Cache the result
    return data?.value;
  }

  return { fetchFeature };
}
