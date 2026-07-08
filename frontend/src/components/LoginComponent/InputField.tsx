import React, { useState } from 'react';

interface InputFieldProps {
    label: string;
    icon: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, icon, type = "text", placeholder, name, value, onChange }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isPassword = type === "password";

    return (
        <div className="group">
            <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-secondary transition-colors">
                {label}
            </label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">
                    {icon}
                </span>
                <input
                    type={isPassword && showPassword ? "text" : type}
                    name={name}
                    value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 pl-8 py-2 outline-none ${isPassword ? 'pr-10' : 'pr-0'}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-outline hover:text-secondary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? 'visibility' : 'visibility_off'}
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;