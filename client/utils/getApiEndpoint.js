import { config } from "../config.js";

export function getApiEndpoint(){
    const endpoint = config.DATABASE === 'DJANGO' ? config.DJANGO_URL : config.CSHARP_URL;
    return endpoint;
}