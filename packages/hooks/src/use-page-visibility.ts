// use page visitbility


export function usePageVisibilityFactory(callback: () => void): object {

  const usePageVisibility = () => {
    let hidden = ''
    let visibilityChange = ''

    if (typeof document.hidden !== undefined) {
      hidden = 'hidden'
      visibilityChange = 'visibilityChange'
    } else if (typeof document.msHidden !== undefined) {
      hidden = 'msHidden'
      visibilityChange = 'msVisibilityChange'
    } else if (typeof document.webkitHidden !== undefined) {
      hidden = 'webkitHidden'
      visibilityChange = 'webkitVisibilityChange'
    }

    callback(document[hidden])
  }


  const onMounted = () => {
    document.addEventListener(visibilityChange, usePageVisibility, false)
  }

  const onUnmounted = () => {
    document.removeEventListener(visibilityChange, usePageVisibility)
  }

}
