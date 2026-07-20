function Button({

    children,

    onClick,

    type = "button"

}) {

    return (

        <button

            type={type}

            onClick={onClick}

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