

export default function Navbar(){
    return(<div className=" bg-black/80">
       <div className="flex justify-between ml-10 mr-10">
        <div className="font-bold text-white text-4xl mt-5 ">Chess.com</div>
        <div className="flex gap-10 mt-5">
            <button className=" bg-green-500 hover:bg-green-700 text-white 
         font-bold py-3 px-6 text-xl rounded">Signup</button>
            <button  className=" bg-slate-500 hover:bg-slate-700 text-white 
         font-bold py-3 px-6 text-xl rounded">Signin</button>
        </div>
      </div>
      </div>
      )
}