import React, { useState } from 'react';
import {ChannelList,useChatContext} from 'stream-chat-react';
import {ChannelSearch,TeamChannelList,TeamChannelPreview} from './'
import Cookies from 'universal-cookie';
import MessageIcon from '../assets/message.jpg';
import LogoutIcon from '../assets/logout.png';

const cookies=new Cookies();

const SideBar = ({logout}) => {

  return (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={MessageIcon} alt="Logo" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>



  </div>
  );
}

const CompanyHeader = () => {
  return (
  <div className="channel-list__header">
    <p className="channel-list__header__text">
      Interact App
    </p>
  </div>
  );
}
  
const customChannelTeamFilter = (channels) => {

  return channels.filter((channel)=>channel.type==='team');
}


const customChannelMessagingFilter = (channels) => {

  return channels.filter((channel)=>channel.type==='messaging');
}

const ChannelListContent = ({isCreating,setIsCreating,setCreateType,setIsEditing,setToggleContainer}) => {

  const {client}=useChatContext();



  const logout=()=>{

        cookies.remove('userName');
        cookies.remove('fullName');
        cookies.remove('userId');
        cookies.remove('phoneNumber');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('token');
        
        window.location.reload();
  }

  const filters ={members:{$in:[client.userID]}};
  return (
    <>
        <SideBar logout={logout}/>
        <div className="channel-list__list__wrapper">
          <CompanyHeader />
          <ChannelSearch  setToggleContainer={setToggleContainer} />
          <ChannelList 
              filters={filters}
              channelRenderFilterFn={customChannelTeamFilter}
              List={(listprops)=>(
                <TeamChannelList 
                  {...listprops}
                  type='team'
                  isCreating ={isCreating}
                  setIsCreating={setIsCreating} 
                  setIsEditing={setIsEditing}
                  setCreateType={setCreateType} 
                  setToggleContainer={setToggleContainer}
                />
              )}

              Preview={(previewprops) => (
                <TeamChannelPreview 

                    {...previewprops}
                    setToggleContainer={setToggleContainer}
                    setIsCreating={setIsCreating} 
                    setIsEditing={setIsEditing}
                    type='team'


                />
              )}
          />

          <ChannelList 
              filters={filters}
              channelRenderFilterFn={customChannelMessagingFilter}
              List={(listprops)=>(
                <TeamChannelList 
                  {...listprops}
                  type='messaging'
                  isCreating ={isCreating}
                  setIsCreating={setIsCreating} 
                  setCreateType={setCreateType} 
                  setIsEditing={setIsEditing}
                  setToggleContainer={setToggleContainer}
                />
              )}

              Preview={(previewprops) => (
                <TeamChannelPreview 

                    {...previewprops}
                    setToggleContainer={setToggleContainer}
                    setIsCreating={setIsCreating} 
                    setIsEditing={setIsEditing}
                    type='messaging'


                />
              )}
          />
        </div>  
    </>
  )
}

const ChannelListContainer =({setIsCreating,setCreateType,setIsEditing})=>{

  const [toggleContainer,setToggleContainer]=useState(false);

  return (

    <>
      <div className="channel-list__container">
        <ChannelListContent  setIsCreating={setIsCreating}  setCreateType={setCreateType} setIsEditing={setIsEditing} />
        
      </div>

      <div className="channel-list__container-responsive" style={{left:toggleContainer?"0%":"-89%",backgroundColor:"#005fff"}}>

        <div className="channel-list__container-toggle" onClick={()=>setToggleContainer((preval) => !preval)}>
        </div>

        <ChannelListContent
          setIsCreating={setIsCreating}  
          setCreateType={setCreateType} 
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
        
        

      </div>
    </>


  );


}

export default ChannelListContainer;
