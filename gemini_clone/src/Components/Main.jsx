import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { Context } from '../Context/Context'
const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)



    return (
        <div className='main flex-1 min-h-screen relative'>
            <div className="nav flex items-center justify-between text-xl p-5">
                <p>Gemini</p>
                <img className='w-10 rounded-full' src={assets.user_icon} alt="" />
            </div>
            <div className="main-container m-auto max-w-4xl">

                {!showResult ?
                    <>
                        <div className="greet my-12 text-6xl font-medium p-5">
                            <p><span>Hello, Dev</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards grid ">
                            <div className="card">
                                <p>Settle a debate: how should you store bread?</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Teach me to make homemade ice cream</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Help me incorporate more plant-based options in my diet</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :<div className='result'>
                        <div className="result-title my-10 flex items-center gap-5">
                            <img className='w-10 rounded-full' src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data flex items-start gap-5">
                            <img className='w-10 rounded-full' src={assets.gemini_icon} alt="" />
                            {loading?
                            <div className="loader w-full flex flex-col gap-3 mt-5">
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                        </div>
                    </div>
                    }
                <div className="main-bottom absolute flex flex-col bottom-0 w-full px-5 m-auto">
                    <div className="search-box flex items-center justify-between gap-5 py-3 px-5 rounded-full">
                        <input onChange={(e) => { setInput(e.target.value) }} value={input} className='flex bg-transparent border-none outline-none p-2 text-lg w-full' type="text" placeholder='Enter a prompt here' />
                        <div className='flex items-center gap-4'>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => onSent(input)} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-icon text-xs my-4 mx-auto font-light">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
