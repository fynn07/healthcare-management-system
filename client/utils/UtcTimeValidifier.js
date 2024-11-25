import { config } from "../config.js";

export function UtcTimeValidifier(date) {
    // If DATABASE is 'CSHARP', convert the date to UTC
    if (config.DATABASE === 'CSHARP') {
        const utcDate = new Date(date).toISOString();
        return utcDate;
    } else {
        // Else, return the date in "YYYY-MM-DD" format
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    }
}
