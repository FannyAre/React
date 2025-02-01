import axios from 'axios'; 
import { useState } from 'react';

export default <T>()=>{
  const[loading,setloading]=useState(false);
  const[data,setData]=useState<T>();

  const fetch=(url:string)=>{
    setloading(true)
    axios.get(url)
      .then(({data})=>setData(data.meals[0])).finally(() =>setloading(false))
  }
  return{loading,data,fetch};
}