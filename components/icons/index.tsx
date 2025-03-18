import React from "react"

const Left = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentcolor",
                strokeWidth: 4,
                overflow: "visible",
            }}
        >
            <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" />
        </svg>
    )
}
const Cross = () => {
    return (
        <svg
            viewBox="0 0 12 12"
            role="presentation"
            aria-hidden="true"
            focusable="false"
            style={{ height: "12px", width: "12px", display: "block", fill: "currentcolor" }}
        >
            <path
                d="m11.5 10.5c.3.3.3.8 0 1.1s-.8.3-1.1 0l-4.4-4.5-4.5 4.5c-.3.3-.8.3-1.1 0s-.3-.8 0-1.1l4.5-4.5-4.4-4.5c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l4.4 4.5 4.5-4.5c.3-.3.8-.3 1.1 0s .3.8 0 1.1l-4.5 4.5z"
                fillRule="evenodd"
            />
        </svg>
    )
}
const Share = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentcolor",
                strokeWidth: 2,
                overflow: "visible",
            }}
        >
            <g fill="none">
                <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23V3zM6 13l9.3-9.3a1 1 0 0 1 1.4 0L26 13" />
            </g>
        </svg>
    )
}
const Heart = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentcolor",
                strokeWidth: 2,
                overflow: "visible",
            }}
        >
            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
        </svg>
    )
}
const LeftArrow = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                fill="black"
            ></path>
        </svg>
    )
}
const RightArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
                display: "block",
                fill: "none",
                height: "12px",
                width: "12px",
                stroke: "currentcolor",
                strokeWidth: 4,
                overflow: "visible",
                cursor: "pointer",
            }}
        >
            <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" />
        </svg>
    )
}

const Info = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.9998 27.3337C6.63604 27.3337 0.666504 21.3641 0.666504 14.0003C0.666504 6.63653 6.63604 0.666992 13.9998 0.666992C21.3636 0.666992 27.3332 6.63653 27.3332 14.0003C27.3332 21.3641 21.3636 27.3337 13.9998 27.3337ZM13.9998 24.667C19.8909 24.667 24.6665 19.8914 24.6665 14.0003C24.6665 8.10929 19.8909 3.33366 13.9998 3.33366C8.1088 3.33366 3.33317 8.10929 3.33317 14.0003C3.33317 19.8914 8.1088 24.667 13.9998 24.667ZM12.6665 7.33366H15.3332V10.0003H12.6665V7.33366ZM12.6665 12.667H15.3332V20.667H12.6665V12.667Z"
                fill="#002266"
            />
        </svg>
    )
}

export { Left, Cross, Share, Heart, LeftArrow, RightArrow, Info }
