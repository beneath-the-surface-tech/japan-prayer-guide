import React from 'react';

const Left = () =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible'}}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" /></svg>
    )
}
const Cross = () =>{
    return(
        <svg viewBox="0 0 12 12" role="presentation" aria-hidden="true" focusable="false" style={{height: '12px', width: '12px', display: 'block', fill: 'currentcolor'}}><path d="m11.5 10.5c.3.3.3.8 0 1.1s-.8.3-1.1 0l-4.4-4.5-4.5 4.5c-.3.3-.8.3-1.1 0s-.3-.8 0-1.1l4.5-4.5-4.4-4.5c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l4.4 4.5 4.5-4.5c.3-.3.8-.3 1.1 0s .3.8 0 1.1l-4.5 4.5z" fillRule="evenodd" /></svg>
    )
}
const Share = () =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 2, overflow: 'visible'}}><g fill="none"><path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23V3zM6 13l9.3-9.3a1 1 0 0 1 1.4 0L26 13" /></g></svg>
    )
}
const Heart = () =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 2, overflow: 'visible'}}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" /></svg>
    )
}
const LeftArrow = () =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible'}}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" /></svg>
    )
}
const RightArrow = () =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible'}}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" /></svg>
    )
}

export { Left, Cross, Share, Heart, LeftArrow, RightArrow };  