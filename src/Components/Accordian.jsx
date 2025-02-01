import { Itemlist } from "./Itemlist"

export const Accordian =({info})=>{

 const hasNestedCatergory=info.categories && info.categories.length>0
  const hasItemList = info.itemCards && info.itemCards.length>0
    return(<div>
        <div className="accordion accordion-flush" style={{width: window.innerWidth > 768?"600px":"380px" ,margin:"10px auto"}} id="accordionFlushExample">
{ hasItemList && <div className="accordion-item">
  
<h2 className="accordion-header">
  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
  {info.title}({info.itemCards.length})
  </button>
</h2>
<div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
  <div className="accordion-body">
   <Itemlist data={info.itemCards} />
  </div>

</div>
</div>}
{ hasNestedCatergory && <div className="accordion-item">
  <h1 style={{fontSize:"20px" , marginLeft:"25px",marginTop:"5px"}}>{info.title}</h1>
  {info.categories.map((item)=>{
      return(
        <div key={item.title}>
        <span className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
         {item.title}({item.itemCards.length})
         </button>
       </span>
       <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
         <div className="accordion-body">
          <Itemlist data={item.itemCards} />
         </div>
       </div>
       </div>
        
      )
    })}
 
  </div>

}

</div>
    </div>)
}