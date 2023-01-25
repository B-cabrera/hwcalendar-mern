import { ChangeEvent, FormEvent } from "react";

type FormProps = {
    showForm?: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (event: FormEvent<HTMLFormElement>) => void,
    value: string,
}


export default FormProps;