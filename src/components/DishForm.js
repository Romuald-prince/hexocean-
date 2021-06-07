import React from "react";
import { reduxForm, Field } from "redux-form";
import { useSelector } from "react-redux";
import showResults from "./showResults";
import types from "../data/type";
import { hours, minutes, seconds } from "../data/time";
import {spiciness} from "../data/spiciness";

const createRenderer =
  (render) =>
  ({ input, meta, label, ...rest }) =>
    (
      <div
        className={[
          meta.error && meta.touched ? "error" : "",
          meta.active ? "active" : "",
        ].join(" ")}
      >
        <label>{label}</label>
        {render(input, label, rest)}
        {meta.error && meta.touched && <span>{meta.error}</span>}
      </div>
    );

const RenderInput = createRenderer((input, label) => (
  <input {...input} placeholder={label} />
));

const RenderSelect = createRenderer((input, label, { children }) => (
  <select {...input}>{children}</select>
));

const RenderRange = createRenderer((input, label) => (
  <input
    type="range"
    min="1"
    max="10"
    step="1"
    defaultValue="1"
    {...input}
    placeholder={label}
  />
));

let DishForm = ({ handleSubmit, submitting }) => {
  const dish = useSelector((state) => state.form.dish);
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
  const checkValues = (state, field) => {
    if (!state) return false;
    if (!state.values) return false;
    if (!state.values[field]) return false;
    if (state.values[field]) return state.values[field];
  };
  const fetchSubmit = (data)=>{

        data.diameter = parseFloat(data.diameter);
        data.preparation_time = data.hour + ":" + data.minute + ":" + data.second;
        data.no_of_slices = parseInt(data.no_of_slices);
        delete data.hour;
        delete data.minute;
        delete data.second;
        data = deleteField(data, data.type);
      try{
        fetch("https://frosty-wood-6558.getsandbox.com:443/dishes",{
          method:"post",
          headers: new Headers({'content-type': 'application/json'}),
          body: JSON.stringify(data)
      }).then(response => response.json()).then(res => alert(res));

      }catch(error){
          alert(error);
      }
      
  }
  console.log(dish);
  return (
    <div className="container">
      <form onSubmit={handleSubmit(fetchSubmit)}>
        <div className="row">
          <div className="col-50">
            <Field name="name" label="Dish Name" component={RenderInput} />
          </div>
          <div className="col-50">
            <Field name="type" label="Dish Type" component={RenderSelect}>
              <option />
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Field>
          </div>
        </div>

        <div className="row">
          <div className="col-25" style={{display:"inline-block"}}>
            <p className="mr-20">Preparation Time </p>
          </div>

          <div className="col-75">
            <div className="row none-box-shadow">
              <div className="col-33">
                <Field name="hour" label="Hour" component={RenderSelect}>
                  <option />
                  {hours().map((hour) => (
                    <option key={hour.value} value={hour.value}>
                      {hour.label}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="col-33">
                <Field name="minute" label="Minute" component={RenderSelect}>
                  <option />
                  {minutes().map((minute) => (
                    <option key={minute.value} value={minute.value}>
                      {minute.label}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="col-33">
                <Field name="second" label="Second" component={RenderSelect}>
                  <option />
                  {seconds().map((second) => (
                    <option key={second.value} value={second.value}>
                      {second.label}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
          </div>
        </div>
        <div>
          <br />
          <hr />
          <h2>Detail</h2>
        </div>

        {checkValues(dish, "type") === "pizza" && (
          <div className="row">
            <Field
              name="no_of_slices"
              label="Number of Slices"
              component={RenderInput}
            />
            <Field name="diameter" label="Diameter" component={RenderInput} />
          </div>
        )}

        {checkValues(dish, "type") === "soup" && (
          <div className="row">
            <Field
              name="spiciness_scale"
              label="Spiciness Scale"
              component={RenderSelect}
            >
             {spiciness().map((spicines) => (
                    <option key={spicines.value} value={spicines.value}>
                      {spicines.label}
                    </option>
                  ))}   
            </Field>
          </div>
        )}

        {checkValues(dish, "type") === "sandwich" && (
          <div className="row">
            <Field
              name="slices_of_bread"
              label="Slices of Bread"
              component={RenderInput}
            />
          </div>
        )}

        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

DishForm = reduxForm({
  form: "dish",
  destroyOnUnmount: false,
})(DishForm);
export default DishForm;
