import { createContext,useState} from "react";

export const UserContext = createContext({
    currentUser:{
        user:null,
    },
    setUser:()=>{}
})

export const UserProvider = ({children})=>{
    const [currentUser,setUser] = useState({
        user:null,
    })

    const values = {currentUser,setUser}

   return(
    <UserContext.Provider value={values}>{children}</UserContext.Provider>
   )
}