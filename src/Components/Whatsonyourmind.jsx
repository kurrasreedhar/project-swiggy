import { useRef } from 'react';
import { CDNI } from '../Utils/Constants';
import { useData } from '../Hooks/useData';

export const Whatsonyourmind=()=>{

  const values=useData();
const sliderRef = useRef(null);
const scrollAmount = 450
 const listdata=values?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info || []
            console.log(listdata)
        
return(<div  >  
    <div className='whatsinyourmindheader'>
        <h5 style={{fontWeight:"bold"}}>What's on your mind?</h5>
        <div >
              <i className="bi bi-arrow-left-circle"  style={{ fontSize: '1.5rem', width: '50px', height: '50px',marginLeft:'5px' }}
             onClick={() => sliderRef.current && (sliderRef.current.scrollLeft -= scrollAmount)}></i>
               <i className="bi bi-arrow-right-circle"  style={{ fontSize: '1.5rem', width: '50px', height: '50px',marginLeft:'5px' }}
               onClick={() => sliderRef.current && (sliderRef.current.scrollLeft += scrollAmount)}></i>  
    </div>
    </div>
        <div  ref={sliderRef} style={{scrollBehavior:"smooth", transition:"0.4s",overflow:'hidden', marginRight:"30px"  }}>
            <div className='whatsinyourminddata'>
    { listdata.length>0 ? (listdata.map((item)=>{
    return <img src={CDNI + item?.imageId} key={item.id} />})): (<p>no items</p>)}
    </div>
    </div>
 </div>)
}