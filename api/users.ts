// import sleep from 'sleep-promise';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface User {
  id: number;
  name: string;
    email: string;
    password:string;
    avatar:string;
}


export const getUserByEmail=async (email:string):Promise<User>=>{
  const result=await fetch(`${API_URL}/users/email/${email}`);
  return result.json();
}

// export const getUser = async (): Promise<User[]> => {
// //   await sleep(2000);
//   const response = await fetch(`${API_URL}/users/`);
//   const result = await response.json();
//   return result;
// };
 

//we only need fetch



//     export const createCategory = async (text: string): Promise<Category> => {
//         const category ={
//       text,
//       done: false
//     };

//     const result = await fetch(`${API_URL}/shop/categories`, {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//     },

//     body: JSON.stringify(category),
//     });
//     return result.json();
// };

// export const updateCategory=async (category:Category):Promise<Category>=>{
//   const result=await fetch(`${API_URL}/shop/categories/${category.id}`,{
//     method:'PUT',
//     headers:{
//       'Content-Type':'application/json',
//     },
//     body:JSON.stringify(category),
//   });
//   return result.json();
// };

// export const deleteCategory=async (id:number):Promise<Category>=>{
//   const result=await fetch(`${API_URL}/shop/categories/${id}`,{
//     method:'DELETE',
//   });
//   return result.json();
// };


// export const getCategoryById=async (id:number):Promise<Category>=>{
//   const result=await fetch(`${API_URL}/shop/categories/${id}`);
//   return result.json();
// }

