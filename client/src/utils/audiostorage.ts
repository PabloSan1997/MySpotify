export const audiostorage = {
    read(){
        if(!localStorage.audio)
            localStorage.audio = '0';

        return Number(localStorage.audio);
    },
    save(value:number){
        localStorage.audio = value;
    }
}