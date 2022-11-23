

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
    className: string;
    handleChange: (e: any) => void;
    value: string;
    required?: boolean;
}

const InputField = ({ type, name, placeholder, className, handleChange, value }: InputFieldProps) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={`p-[0.5rem] outline-none border-[1px] border-solid border-[#434343] indent-[10px] focus:valid:border-[1px] focus:valid:border-green-300 focus:valid:border-solid focus:invalid:border-[1px] focus:invalid:border-red-200 focus:inavlid:border-solid ${className}`}
            onChange={handleChange}
            value={value}
            required
        />

    )
}

export default InputField