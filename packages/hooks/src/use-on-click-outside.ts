// detect if a click happen outside the target element

export function useOnClickOutsideFactory(ref = null, callback: () => void): object {

  const handleOnClickOutside = (event) => {
    if (ref.value && !ref.value.contains(event.target)) {
      callback()
    }
  }

  const onMounted = () => {
    document.addEventListener('mousedown', handleOnClickOutside)
  }

  const onUnmounted = () => {
    document.removeEventListener('mousedown', handleOnClickOutside)
  }

  return {
    onMounted,
    onUnmounted
  }

}
