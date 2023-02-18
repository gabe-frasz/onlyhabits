import { Heading } from "@c6r/react";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Heading>Hello World</Heading>
    </div>
  );
}

export default App;
