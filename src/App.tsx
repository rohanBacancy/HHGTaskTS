import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import CounterTask from "./Components/CounterTask/CounterTask";
import EmployeeTask from "./Components/EmployeesTask/EmployeeTask";

function App() {

  const [value, setValue] = useState(0);
  let renderTask: JSX.Element = <CounterTask/>;

  const handleChange = (event:React.ChangeEvent<{}>, newValue:number) => {
    setValue(newValue);
  };

  if(value === 0)
  {
    renderTask = <CounterTask/>;
  }
  else if(value === 1)
  {
    renderTask = <EmployeeTask/>;
  }
  
  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Counter Task" />
          <Tab label="Employees Task" />
        </Tabs>
      </AppBar>
      
      {renderTask}
    </>
  );
}

export default App;
