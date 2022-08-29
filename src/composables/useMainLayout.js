import { computed, ref } from 'vue'

const layoutData = ref({
  isShown: false
})

export default function useMainLayout () {
  return {
    layoutData: computed(() => layoutData.value)
  }
}
