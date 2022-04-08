/**
 * This factory method will return several properties and methods
 *
 */
export function useWindowResizeFactory(ref: any): object {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const handleResize = (): void => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  const onMounted = (): void => {
    window.addEventListener('resize', handleResize)
  }
  const onUnmounted = (): void => {
    window.removeEventListener('resize', handleResize)
  }

  return {
    width,
    height,
    handleResize,
    onMounted,
    onUnmounted
  }
}
