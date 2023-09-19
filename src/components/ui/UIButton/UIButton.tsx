
import React from "react";
import {UILoading} from "../UILoading/UILoading";
import {getColor} from "./getColor";
import {transformToBool} from "../../../utils/transformToBool";
import {getSize} from "./getSize";


type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    loading?: boolean
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'white' | ''
    size?: 'xs' | 'sm' | 'md' | 'lg'
    rounded?: boolean
    block?: boolean
    iconOnly?: boolean
    className?: string
}

export const UIButton = ({children = 'Button', block = false,iconOnly = false, type = 'button', disabled, loading = false, color = '', rounded = false, size = 'md', onClick, className}: ButtonProps  ) => {
    const buttonClasses = [
        className,
        loading ? 'pointer-events-none': '',
        rounded ? 'rounded-full': '',
        getColor(color, loading, transformToBool(disabled)),
        block ? 'flex w-full' : 'inline-flex',
        'justify-center items-center border font-medium rounded-md focus:outline-none transition ease-in-out duration-150',
        iconOnly ? 'p-2' : getSize(size),
    ]
    return (
        <button onClick={onClick} type={type} className={buttonClasses.join(' ')}>
            {loading && <UILoading color={color} size={size}/>}
            {children}
        </button>
    )
}