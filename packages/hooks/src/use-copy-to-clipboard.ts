// copy to clipboard


export function useCopyToClipboardFactory(): object {

  const useCopyToClipboard = (text: string | number): boolean => {
    if (typeof text === 'string' || typeof text === 'number') {
      const input = document.createElement('input')
      input.setAttribute('value', text as string)
      document.body.appendChild(input)
      input.select()
      // @BUG execCommand is deprecated?
      let result = document.execCommand('copy')
      document.body.removeChild(input)

      return result
    }

    return false
  }


  return {
    useCopyToClipboard
  }
}
