export function checkReponse(res:any) {
 return res.ok 
 ? res.json() 
 : res.json()
   .then((err:any) => Promise.reject(err));
};