import { createContext, useState } from "react";
import run from '../config/Gemini';

export const Context = createContext();

const ContextProvider = (props) => {
          const [input, setInput] = useState("");
          const [recentPrompt, setRecentPrompt] = useState("");
          const [prevPrompts, setPrevePrompts] = useState([]);
          const [showResults, setshowResults] = useState(false);
          const [loading, setLoading] = useState(false);
          const [resultData, setResultData] = useState("");


          const onSet = async (prompt) => {
                    setResultData("")
                    setLoading(true)
                    setshowResults(true)
                    setRecentPrompt(input);
                    setPrevePrompts(prev =>[...prev,input]);
                    const response=await run(input);
                    const responsArray=response.split("**");
                    let newArray;
                    for(let i=0;i< responsArray.length;i++){
                              if(i===0 || i%2 !== 1){
                                        newArray += responsArray[i];

                              }
                              else{
                                        newArray+= "<b>"+responsArray[i] + "</b>";
                              }
                    }
                    let newArray2=newArray.split("*").join("</br>");
                    setResultData(newArray2);
                    setLoading(false)
                    setInput("");


          }
         
         
          const contextValue = {
                    prevPrompts,
                    setPrevePrompts,
                    onSet,
                    setRecentPrompt,
                    recentPrompt,
                    showResults,
                    loading,
                    resultData,
                    input,
                    setInput

          }

          return (
                    <Context.Provider value={contextValue} >
                              {props.children}
                    </Context.Provider>


          )


}

export default ContextProvider;