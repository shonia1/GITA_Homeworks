import H1 from "./components/H1";
import Input from "./components/Input";
import P from "./components/P";
import "./App.css";

function App() {
  let obj = {
    name: "ana",
    age: 22,
  };
  let str = obj.name;
  let num = obj.age;
  let arr = [obj.name, obj.age];
  let func = () => {
    return obj.age + 1;
  };
  //console.log(str, num, arr, obj, func);
  return (
    <>
      <H1 />
      <Input />
      <P />
      <div className="div">
        {str}, {num}, {arr.join(":")}, {obj.age}, {func()}
      </div>
    </>
  );
}

export default App;
