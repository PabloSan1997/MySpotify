export const loginstorage = {
    read(){
        if(!localStorage.view)
            localStorage.view = '';

        return localStorage.view;
    },
    save(jwt:string){
        localStorage.view = jwt;
    }
}