type RoadmapTypes = {
    data:  {
        steps: {
            name: string
        }[]
    }
}

export default  function Roadmap({ data }:  RoadmapTypes){
    return(
        <div className="h-max flex overflow-auto flex-col justify-center items-center p-10">
            <main className="w-full flex flex-col items-center justify-center outline-4 outline-dashed outline-slate-400 bg-slate-100 rounded-lg">
            {
                data.steps.map((step, index)=>{
                    return (
                        <div key={index} className=" w-1/2   p-10 flex justify-center ">
                            
                            <div className="relative bg-default_purple min-w-[10rem] max-w-[15rem] p-10 rounded-lg text-center text-white">
                            <p className="rounded-full font-bold w-6 h-6 text-default_purple bg-white absolute right-[5px] top-[5px]">{index+1}</p>
                                {step.name}
                            </div>
                        </div>
                    )
                })
            }
            </main>
        </div>
    )
}