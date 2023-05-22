import { TopicTypes } from "@/@types/TopicTypes"

type OverviewTypes = {
    data:  TopicTypes
}

export default  function Overview({data}:  OverviewTypes){
    return(
        <div className="p-14 px-24">
            <h1 className="text-3xl mb-5 font-semibold text-default_purple">
                {data.name}
            </h1>

            <main className="text-lg">

                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Criador(es):</span> {data.overview.creators}</p>
                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Data de criação:</span> {data.overview.creation_date}</p>
                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Preço($):</span> {data.overview.price}</p>
                <p className="flex flex-col my-2 text-slate-600">
                    <span className="font-semibold text-slate-700">Overview:</span> 
                    <p>
                        {data.overview.resume}
                    </p>
                </p>

                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Usabilidade:</span> {data.overview.use}</p>
                <p className="my-2 text-slate-600"><span className="font-semibold mr-3 text-slate-700">Links:</span> {data.overview.links}</p>


            </main>
        </div>
    )
}