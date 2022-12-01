

interface ButtonProps {
    Fn: (e: any) => void;
    children: string;
    type: "button" | "submit" | "reset";
    className?: string;
}

const Button = ({ Fn, children, type, className }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`my-2 bg-black text-white w-full py-2 rounded outline-none capitalize text-[18px] ${className}`}
            onClick={Fn}
        >
            {children}
        </button>
    )
}

export default Button;