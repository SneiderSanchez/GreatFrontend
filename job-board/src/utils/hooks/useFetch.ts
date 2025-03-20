import { useEffect, useState } from "react";

export default function useFetch<T>({url}:{url:string}) {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<null|unknown>(null)

  useEffect(()=>{
    async function getData() {
      try {
        const data = await fetch(url)
        const parsedData = await data.json()
        setData(parsedData)
      } catch (e) {
        setError(e)
        console.log(e)  
      }
  
    }
    getData();
  },[url])
 
  return {
    data,
    error
  }
}