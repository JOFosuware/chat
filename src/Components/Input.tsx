import React from 'react';

type InputProps = {
    name: string;
    value?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export default function Input({
    type = "text",
    name,
    value,
    onChange,
                                  className,
    onKeyDown,
    disabled,
}: InputProps) {
    return (
        <input
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
            type={type}
            placeholder={"Enter " + name}
            className={
            `flex-1 placeholder-gray-300 bg-transparent px-3 py-1 border-2 border-gray-300 rounded-full
                ${className ? className : ""}
            `
            }
        />
    )
}