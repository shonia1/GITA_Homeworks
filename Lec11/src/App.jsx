import H1 from "./components/H1";
import Input from "./components/Input";
import P from "./components/P";

function App() {
  const str = "string";
  const num = 11;
  const arr = ["arr1", "arr2", "arr3"];
  const obj = {
    name: "ana",
    age: 22,
  };
  const func = () => {
    return 2 * 5;
  };
  console.log(str, num, arr, obj, func);
  return (
    <>
      <H1 />
      <Input />
      <P />
      {str},{num},{arr},{obj.age},{func()}
    </>
  );
}

export default App;
