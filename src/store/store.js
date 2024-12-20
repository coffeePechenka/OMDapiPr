import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { db } from "./firebase";


export const useStore = create(devtools(immer((set) => ({
    currentUser: null,
    isLoading: true,

    fetchUser: async(uid) => {
        if (!uid) return set ({currentUser: null, isLoading: false})

        try{
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                set({currentUser: docSnap.data(), isLoading: false})
            }
            else{
                set ({currentUser: null, isLoading: false}) 
            }
        }
        catch(err){
            console.log(err)
            set ({currentUser: null, isLoading: false})
        }
    }
}))))