import { useEffect,useState } from "react";

const useFetch = (url) =>{
    const [movies, setMovies] = useState(null)
  const[isPending,setIsPending] = useState(true)
  const[error,setError] = useState(null)
    useEffect(()=>{
        const abortCont = new AbortController();
        setTimeout(() => {
          fetch(url,{signal:abortCont.signal})
        .then(res =>{
          if(!res.ok){
            throw Error('could not connect to server')
          }
           return res.json()
        })
        .then(data =>{
          setMovies(data);
          setIsPending(false);
        setError(null);
        })
        .catch(err =>{
            if(err.name ==='AbortError'){
                console.log('fetch aborted')
            }else{
                setIsPending(false);
                setError(err.message);
            }
          
        })
        },1000)

        return () => abortCont.abort();

      },[url]);
      return{movies,isPending,error}
}

export default useFetch;