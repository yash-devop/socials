export default function Username({params}:any){
    console.log('params',params);
    return(
        <>
            <div>
                <h1>{params.name}</h1>
            </div>
        </>
    )
}