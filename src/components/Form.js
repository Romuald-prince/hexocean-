import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputTime from "./InputTime";

const Form = () => {
  const dispatch = useDispatch();
  const dish = useSelector((state) => state.dish);

  const handleClick = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let editData = {...dish};
    if(name === "type")
      editData = deleteField(editData,value);

    editData[name] = value;
    console.log("data", editData);
    dispatch({
      type: "SETDISH",
      payload: editData,
    });
  };


  const deleteField =(item,type)=>{
    if(type === "pizza"){
      delete item.spiciness_scale;
      delete item.slices_of_bread;
    }
    else if(type === "soup"){
      delete item.no_of_slices;
      delete item.diameter;
      delete item.slices_of_bread;
    }
    else{
      delete item.spiciness_scale;
      delete item.no_of_slices;
      delete item.diameter;
    }
    return item;
  }

  

  return (
    <div className="container">
      <form>
        <div className="row">
          <label className="col-25">Dish Name:</label>
          <input
            name="name"
            className="col-75"
            type="text"
            onChange={(e) => handleClick(e)}
          />
        </div>

        <div className="row">
          <label className="col-25">Preparation Time:</label>
          <div className="col-75 no-padding">
            <InputTime/>
          </div>
          {/* <input
            className="col-75"
            type="time"
            name="preparation_time"
            step="1"
            min="00:00:00"
            max="20:00:00"
            onChange={(e) => handleClick(e)}
          /> */}
        </div>

        <div className="row">
          <label className="col-25">Dish Type:</label>
          <select
            name="type"
            className="col-75"
            onChange={(e) => handleClick(e)}
          >
            <option value="pizza">Pizza</option>
            <option value="soup">soup</option>
            <option selected value="sandwich">
              sandwich
            </option>
          </select>
        </div>
        <br />
        <hr />
        <h2>Detail</h2>
        {dish.type === "pizza" && (
          <div className="row">
            <div className="col-50">
              <label className="col-25">Slice:</label>
              <input name="no_of_slices" className="col-50" type="text" onChange={(e)=>handleClick(e)} />
            </div>

            <div className="col-50">
              <label className="col-25">Diameter:</label>
              <input
                name="diameter"
                type="number"
                step={0.01}
                className="col-50"
                onChange={(e)=>handleClick(e)}
              />
            </div>
          </div>
        )}

        {dish.type === "soup" && (
          <div className="row">
            <label className="col-25">spiciness scale</label>
            <div className="col-75">
              <input
                className="col-75"
                type="range"
                id="volume"
                name="spiciness_scale"
                min="1"
                max="10"
                step="1"
                defaultValue="1"
                onChange={(e)=>handleClick(e)}
              />
              <span className="col-10">{dish.spiciness_scale}</span>
            </div>
          </div>
        )}

        {dish.type === "sandwich" && (
          <div className="row">
            <div className="col-50">
              <label className="col-25">Slice:</label>
              <input name="slices_of_bread" className="col-50" type="text" onChange={(e)=>handleClick(e)} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
