import { useState, useEffect } from 'react'
import axios from 'axios'
interface AxiosConfig {
  url: string
  method?: string
  data?: {
    id: string
    task: string
    checked: boolean
  }
}
const useAxios = (dataUrl: string) => {
  const [data, setData] = useState(<[]>[])
  const [fetchError, setFetchError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true
    const source = axios.CancelToken.source()

    const requestAPI = async (url: string) => {
      setIsLoading(true)
      try {
        const response = await axios.get(url)

        // const response = await axios({
        //   ...apiConfig,
        //   cancelToken: source.token,
        // })
        if (isMounted) {
          setData(response.data)
          setFetchError(null)
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setFetchError((err as Error).message)
          setData([])
        }
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    requestAPI(dataUrl)

    const cleanUp = () => {
      isMounted = false
      source.cancel()
    }
    return cleanUp
  }, [dataUrl])

  return { data, fetchError, isLoading }
}

export default useAxios
