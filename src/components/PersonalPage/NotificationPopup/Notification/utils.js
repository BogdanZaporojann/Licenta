export function calcHours(start) {
    return Math.floor(((new Date()).getTime() - (new Date(start)).getTime()) / 3600000) + 2;
}