// use network status

export function useNetworkStatusFactory(callback: (status: boolean) => void): object {

  const updateOnlineStatus = (): void => {
    // we only want boolean value
    const status = navigator.onLine ? true : false
    callback(status)
  }

  const onMounted = () => {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  }

  const onUnmounted = () => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  }

  return {
    onMounted,
    onUnmounted
  }
}
