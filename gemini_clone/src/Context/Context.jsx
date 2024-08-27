import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]); // Renamed for consistency
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false); // Fixed typo
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        if (!prompt || prompt.trim() === "") {
            console.error("Prompt is undefined or empty.");
            return;
        }
    
        setResultData("");
        setLoading(true);
        setShowResult(true);
    
        // Set the recent prompt and add it to the previous prompts only once
        setRecentPrompt(prompt);
        setPreviousPrompts(prev => {
            if (!prev.includes(prompt)) {
                return [...prev, prompt];
            }
            return prev; // Return unchanged if prompt already exists
        });
    
        try {
            const response = await run(prompt);
    
            // Process the response
            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b className='font-black text-black'>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>");
            let newResponseArray = newResponse2.split(" ");
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }
    
        } catch (error) {
            console.error("Error in onSent:", error);
            setResultData("An error occurred while processing your request.");
        } finally {
            setLoading(false);
            setInput(""); // Clear the input field
        }
    };
    

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        previousPrompts, // Updated to match naming
        setPreviousPrompts, // Added setter function
        showResult,
        loading,
        resultData,
        onSent,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
