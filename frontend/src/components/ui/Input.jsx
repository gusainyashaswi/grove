function Input({

    value,

    onChange,

    placeholder

}) {

    return (

        <input

            value={value}

            onChange={onChange}

            placeholder={placeholder}

            className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-[var(--primary)]
            "

        />

    );

}

export default Input;