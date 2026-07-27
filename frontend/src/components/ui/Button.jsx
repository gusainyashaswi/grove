function Button({

    children,

    onClick,

    type = "button",

    disabled = false

}) {

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            className="
                rounded-xl
                bg-[var(--primary)]
                px-6
                py-3
                font-medium
                text-white
                transition
                duration-200
                hover:bg-[var(--primary-hover)]
            "

        >

            {children}

        </button>

    );

}

export default Button;