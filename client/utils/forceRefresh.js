import { config } from "../config.js";

export function forceRefresh(){
    if(config.DATABASE === 'CSHARP'){
        window.location.reload();
    }
    return;
}