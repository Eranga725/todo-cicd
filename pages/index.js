import { Inter } from 'next/font/google'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [todo, setTodo] = useState([]);
  
  const [newTodo, setNewTodo] = useState("");
  
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 9999);
  };
  
  const handleKeyUp = (key) => {
    if (key === 'Enter' && newTodo) {
      const randomNumber = getRandomNumber();
  
      const newItem = {
        id: `item-${randomNumber}`,
        content: newTodo
      };
  
      setTodo(todo.concat(newItem));
  
      setNewTodo("");
    }
  }

  const handleDelete = (id) => {
    if(id>-1){
      setTodo(todo.slice(0, id).concat(todo.slice(id+1)));
    }
  }
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="flex justify-center pt-40">
      <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl opacity-70">
        <div className="flex justify-center cursor-default bg-gray-200 rounded-3xl px-4 py-1 color-gray hover:scale-110 transition-all">
          <img className="object-cover rounded-full w-16 h-16 n-2" src="/image.png" alt="Image" />
          <div className="w-full p-3">
            <p className="text-3xl text-gray-600">Todo List</p>
            <p className="text-sm">{currentDate}</p>
          </div>
        </div>
        <div className="relative mt-10">
          <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='currentColor' className="bi bi-search" viewBox="0 0 16 16"></svg>
            </div>
            <input type="text" id="newTdo" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} onKeyUp={(e)=>handleKeyUp(e.key)} className="block w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white" placeholder="new todo item"/>
        </div>
        <ul className="block w-full pt-6">
          {
            todo?.map((item,index)=>{
              return(
                <li key={item.id}className="w-full border-2 rounded-xl nt-2 hover:border-blue-300">
                <input id={index} type="checkbox" className="float-left block w-6 h-6 m-3"/>
                <button id={index} onClick={()=>handleDelete(index)} className="float-right w-7 h-7 m-2.5 rounded-2xl bg-red-700 text-gray-200 shadow-md hover:bg-red-500 hover:scale-105">x</button>
                <label htmlFor={index} className="block w-full p-3">{item.content}</label>
              </li>
              )
            })
          }
          
        </ul>

      </div>
    </div>
  )
}