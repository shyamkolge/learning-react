import { useEffect, useState } from "react";
import "./App.css";
import DisplayTotalBill from "./Components/DisplayTotalBill";
import SelectSaticfaction from "./Components/SelectSaticfaction";
import TotalBill from "./Components/TotalBill";

function App() {
  const [bill, setBill] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [friendSatisfaction, setFriendSatisfaction] = useState(0);

  let tip = bill * ((satisfaction + friendSatisfaction) / 2 / 100);

  return (
    <>
      <TotalBill onHandle={setBill} bill={bill} />
      <SelectSaticfaction percentage={satisfaction} onSelect={setSatisfaction}>
        How much did you like the service?
      </SelectSaticfaction>
      <SelectSaticfaction
        percentage={friendSatisfaction}
        onSelect={setFriendSatisfaction}
      >
        How much did your frinds like the service?
      </SelectSaticfaction>

      <DisplayTotalBill tip={tip} bill={bill} />
    </>
  );
}

export default App;
