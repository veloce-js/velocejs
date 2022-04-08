// use theme

/*
This method need to setup in the CSS first like this

html[theme="dark"] {
  // your theme defintion
}
html[theme="default"], html {
  // the default look
}
*/

export function useThemeFactory(key = '') {

  const useTheme = (theme: string): void => {
    document.documentElement.setAttribute(key, theme)
  }

}
