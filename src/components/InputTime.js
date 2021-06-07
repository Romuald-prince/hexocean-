import React from "react";
import { useSelector, useDispatch } from "react-redux";

const InputTime = () => {
  const dispatch = useDispatch();
  const dish = useSelector((state) => state.dish);

  //todo:will add handleClick
  const handleClick = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let editData = { ...dish };
    console.log(editData);
    value = checkData(name,value);
    editData.preparation_time[name] = value;
    dispatch({
      type: "SETDISH",
      payload: editData,
    });
  };

  const checkData = (name,value)=>{
    const reg = /^\d+$/;
    if(!reg.test(value))
        return "";
      let data = parseInt(value,10);
    if(["minute", "second"].includes(name)){
        if(data<60 && data >= 0){
            if(value.length === 1)
                return ("0"+value);
            return value;
        }
        else
            return "00";
    }
    return value;
  }

  return (
    <div id="time" className="row ">
      <input
        className="col-33"
        name="hour"
        value={dish.preparation_time.hour}
        type="text"
        onChange={(e) => handleClick(e)}
      />
      <input
        className="col-33"
        name="minute"
        value={dish.preparation_time.minute}
        type="text"
        onChange={(e) => handleClick(e)}
      />
      <input
        className="col-33"
        name="second"
        value={dish.preparation_time.second}
        type="text"
        onChange={(e) => handleClick(e)}
      />
    </div>
  );
};
export default InputTime;