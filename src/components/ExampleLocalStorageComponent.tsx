import { ChangeEvent } from "react";
import { useStateWithLocalStorage } from "../hooks/useStateWithLocalStorage";

export const ExampleLocalStorageComponent = () => {
  const [value, setValue] = useStateWithLocalStorage("myValueInLocalStorage");

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <div>
      <h1>Hello React with Local Storage!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};
