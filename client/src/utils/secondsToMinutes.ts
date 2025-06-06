

export function secondsToMinutes(seconds:number):string{
    const minutes = Math.floor(seconds/60);
    const secondsshow = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secondsshow.toString().padStart(2, '0')}`;
}