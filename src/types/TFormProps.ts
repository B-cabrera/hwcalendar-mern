import { ChangeEvent, FormEvent } from "react";

type TFormProps = {
  showForm?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  value: string,
  onDateChange?: (event: ChangeEvent<HTMLInputElement>) => void,
}


export default TFormProps;