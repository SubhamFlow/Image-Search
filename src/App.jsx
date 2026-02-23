import { useState,useEffect } from 'react'
const apikey = import.meta.env.VITE_PEXELS_API_KEY;

function App() {
  const [data, setdata] = useState([])
  const [query, setquery] = useState("India")
  const [btnval, setbtnval] = useState(0)
  const [loader, setloader] = useState(false)
  
  // let query="Taj mahal in India"
  useEffect(() => {
    async function test() {
      const proxy="https://www.pexels.com/search/proxy%20server/"
      if(query.length<=0){
        return
      }
      const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=100`,{
        headers:{
          Authorization:apikey
        }
      })
      const newdata=await data.json()
    console.log(newdata)
    
      setdata(newdata.photos)
    }
    
    test()


    
  }, [query])
  
 
function searchData(e){
setbtnval(e.target.value)
}



function searchbtn(){
  // setbtnval()
  setloader(true)
  setTimeout(() => {
    return new Promise((resolve,reject)=>{

      setquery(btnval)
      setloader(false)
      resolve()
    })
  },3000);

}

  return (
    <>
  <div className='search-aria flex justify-center m-1 gap-3'>
   <input type="search" name="search" id="value" className='bg-[#0f0f0f] text-[#00ff9f]  
 block p-[9px] w-[346px] text-xl' placeholder="Search here" onChange={searchData}/>
   <button onClick={searchbtn} className='bg-black text-white font-bold p-2 cursor-pointer'>Seacrh</button>
   </div>
 {loader?<div className="w-[63px] h-[63px] border-[10px] border-solid border-gray-500 border-t-red-500 rounded-full animate-spin absolute left-1/2 transform -translate-x-1/2 border-t-gray-500"></div>:<div className="max-w-6xl mx-auto p-4">
  <h1 className="text-3xl font-bold text-center mb-6">Search results of: {query}</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {data.map((item) => (
      <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
        <img src={item.src.medium} alt={`Photo ${item.id}`} className="w-full h-64 object-cover" />
        <div className="p-4 flex flex-col">
          <p>Photo captured by: {item.photographer}</p>
          <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
            View on Website
          </a>
          
        </div>
      </div>
    ))}
  </div>
</div>}

 
    </>
  )
}

export default App
