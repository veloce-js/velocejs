// use timer

export function useTimerFactory(ref:any, callback: (t: number, t1: number) => void, step = 1000): object {

  let timerVariableId = null // react has this useRef<Timer>(null)
  let times = 0
  const isPaused = ref(false)

  const start = () => {
    stop()
    if (!timerVariableId) {
      times = 0
      timerVariableId = setInterval(() => {
        if (!isPaused.value) {
          times++
          callback(times, step*times)
        }
      }, step)
    }
  }

  const stop = () => {
    if (timerVariableId) {
      clearInterval(timerVariableId)
      timerVariableId = null
      resume()
    }
  }

  const pause = () => {
    isPaused.value = true
  }

  const resume = () => {
    isPaused.value = false
  }

  const onUnmounted = () => {
    if (timerVariableId) {
      clearInterval(timerVariableId)
    }
  }

  return {
    start,
    stop,
    pause,
    resume,
    onUnmounted
  }
}
