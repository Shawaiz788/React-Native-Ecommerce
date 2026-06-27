
import { createMMKV } from "react-native-mmkv";
import { StateStorage } from 'zustand/middleware/persist';
export const storage = createMMKV({
  id: "cart-storage",
});


export const zustandStorage: StateStorage = {
setItem: (name: string, value: string) => {
return storage. set(name, value);
},

getItem: (name: string) => {
const value = storage.getString(name);
return value ?? null;

},
removeItem: (name: string) => {
return storage.remove(name);

},

}