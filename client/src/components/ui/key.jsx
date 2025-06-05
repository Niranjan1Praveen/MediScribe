import React from 'react';
import { twMerge } from 'tailwind-merge';

function Key({children, className}) {
    return (
        <div className={twMerge("size-12 bg-neutral-300 inline-flex items-center justify-center rounded-2xl text-xl text-neutral-950 font-medium", className)}>
            {children}
        </div>
    );
}

export default Key;