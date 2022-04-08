// use storage

export function useStorageFactory(): object {

  const getItemFactory = (storage: any): ((key: string) => any) => {

    return (key: string): any => {
      const value: string = storage.getItem(key)
      if (!value) {
        return null
      }
      try {
        return JSON.parse(value)
      } catch(error) {
        return value
      }
    }
  }

  /*
  its using the ref to track the value change and store it back to the storage
  very tricky to make this generic
  this refValue came from ref(setItemFactory(storage)(key))
  */
  const setItemFactory = (refValue: any, storage: any): ((key: string, value: any) => any) => {

    return (key: string, newValue: any): void => {
      refValue.value = newValue
      storage.setItem(key, JSON.stringify(newValue))
    }
  }

  return {
    getItemFactory,
    setItemFactory
  }
}
