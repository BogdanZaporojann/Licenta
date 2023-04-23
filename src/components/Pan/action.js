export const type = {
    START_PAN: 'START_PAN',
    PAN: 'PAN'
}

export const startPan = (event) => ({
    type: type.START_PAN,
    clientX: event.clientX,
    clientY: event.clientY
})

export const pan = (event) => ({
    type: type.PAN,
    clientX: event.clientX,
    clientY: event.clientY
})