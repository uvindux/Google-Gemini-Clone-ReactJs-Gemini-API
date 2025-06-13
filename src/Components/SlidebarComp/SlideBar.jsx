import React, { useContext, useState } from 'react';
import './SlidebarCss.css';
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';

function SlideBar() {
  const [extended, setExtended] = useState(false);
  const{onSent,prevPrompts,setRecentPrompt}= useContext(Context);
  return (
    <div className="sidebar">
      <div className="top">
        <img className="Menue" src={assets.menu_icon} alt="" srcSet="" onClick={()=> setExtended(prev => !prev)} />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" srcSet="" />
         {extended ? <p>New chat</p> :null}
        </div>
        {extended ? <div className="recent">
          <div className="recent-title">
            <p>Recent</p>
            {prevPrompts.map((item,index)=>{
              return(
                <div className="recent-entry">
                <img src={assets.message_icon} alt="" srcSet="" />
                <p>{item}</p>
    
              </div>

              )

            })} 

          </div>
         
        </div> :null }
       

      </div>
      <div className="bottom">


        <div className="bottom-item ">
          <div className="content">
            <img src={assets.question_icon} alt="" srcSet="" />
            {extended ? <p>Help</p> : null}
          </div>

        </div>
        <div className="bottom-item ">

          <div className="content">
            <img src={assets.history_icon} alt="" srcSet="" />
            {extended ? <p>Activity</p> : null}

          </div>

        </div>
        <div className="bottom-item ">

          <div className="content">
            <img src={assets.setting_icon} alt="" srcSet="" />
            {extended ? <p>Settings</p> : null}



          </div>

        </div>
      </div>
    </div>
  );
}

export default SlideBar;