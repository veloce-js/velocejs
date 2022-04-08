// scroll to bottom

export function useScrollToBottomFactory(callback: () => void): object {

  const handleScrolling = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight ) {
      callback()
    }
  }

  const onMounted = () => {
    window.addEventListener('scroll', handleScrolling)
  }

  const onUnmounted = () => {
    window.removeEventListener('scroll', handleScrolling)
  }

  return {
    onMounted,
    onUnmounted
  }
}
