import axios from "axios";
import { useEffect, useState } from "react";   

export default function useHttpData<T>(url:string )
{   
  
  const [data, setData] = useState<T[]>([]);
   
  const [loading, setloading] = useState(false);
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    const { signal } = controller;
    setloading(true);

    axios
      .get<{meals:T[]}>(url , { signal })
      .then(({ data }) => {
        if (!ignore) {
          setData(data.meals);
        }
      })
      .finally(() => {
        if (!ignore) {
          setloading(false);
        }
      });
    return () => {
      ignore = true;
      controller.abort();
    }; //para que se pare si se quiere ejecutar mas de una vez
  }, [url]);  //dependencia: cuando los valores cambian es lo que se ejecuta
    return{loading,data,setData,setloading };
}