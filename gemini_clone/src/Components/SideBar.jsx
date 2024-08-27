import React, { useState, useContext } from 'react'
import { assets } from "../assets/assets"
import "./main.css"
import { Context } from '../Context/Context'
const SideBar = () => {

    const [extended, setExtended] = useState(false)
    const { onSent, previousPrompts, setRecentPrompt , newChat } = useContext(Context)
    const loadPrompt = async (prompt) =>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className='sidebar min-h-screen inline-flex flex-col justify-between py-6 px-4'>
            <div className="top">
                <div className='menue p-3 rounded-full transition'>
                    <img onClick={() => { setExtended(prev => !prev) }} className='menu block cursor-pointer' src={assets.menu_icon} alt="" />
                </div>
                <div onClick={() => newChat()} className="newChat mt-12 inline-flex items-center gap-3 py-2 px-3 rounded-full text-gray-500 cursor-pointer text-sm">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {
                    extended ? (
                        <div className="recent flex flex-col">
                            <div className="recent-title mt-8 mb-5">
                                <p>Recent</p>
                                {previousPrompts.map((item, index) => {
                                    return (
                                        <div onClick={() =>{loadPrompt(item)}} key={index} className="recent-entry flex items-start gap-3 p-3 rounded-full cursor-pointer">
                                            <img className='mt-0.5' src={assets.message_icon} alt="Message Icon" />
                                            <p>{item.slice(0,18)}...</p>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>                                                          
                    ) : null
                }

            </div>
            <div className="bottom flex flex-col">
                <div className="bottom-item recent-entry flex items-start gap-3 p-3 rounded-full cursor-pointer">
                    <img className='mt-1' src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry flex items-start gap-3 p-3  rounded-full cursor-pointer">
                    <img className='mt-1' src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry flex items-start gap-3 p-3 rounded-full cursor-pointer">
                    <img className='mt-1' src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default SideBar
