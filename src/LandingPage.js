import { Button, Select, TextField } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { fetchData } from "./Slice/DataSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttributes } from "./Slice/DataSlice";
import { LinearProgress } from "@mui/material";
export const LandingPage = () => {
  const [FirstOPtion, setFirstOption] = useState("");
  const [parentId, setParentId] = useState([]);
  const [dropDown, setDropDown] = useState([]);
  const [input, setInput] = useState("");
  const output = useSelector((state) => state.fetchingData);
  const loader = useSelector((state) => state.fetchingData.loader);
  const attributes = useSelector((state) => state.fetchingData.attributes);
  const disaptch = useDispatch();
  const attributesData = useDispatch();
  console.log(output.err);
  useEffect(() => {
    disaptch(
      fetchData({
        url: "https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/",
        parentId: parentId,
      })
    );
  }, [parentId]);
  // Showing error page
  if (output.err !== " ") {
    throw new Error(" ");
  }
  // Fetching data in 1st dropdown
  var option = ["select"];

  var option1 = ["--select--"];
  if (output.data.data !== undefined) {
    output.data.data.forEach((element) => {
      let obj = {
        label: element.name,
        value: element.name,
      };
      option.push(obj);
      option1.push(obj);
    });
  }
  var temp = [];
  // Taking state for storing selected option
  const [selected, setSelected] = useState([]);
  var attributesOPtion = ["--Select--"];
  const SelectHandler = (val) => {
    setFirstOption(val);
    // Passing selected option to array for display the selected option...
    selected.push(val);
    setSelected(selected);
    for (let i = 0; i < output.data.data.length; i++) {
      // CHecking the leaf node if true then creading dropdwon here
      if (val === output.data.data[i].name && output.data.data[i].hasChildren) {
        setParentId(output.data.data[i].parent_id);
        temp.push(
          <div>
            <Select
              key={Math.random()}
              options={option1}
              value={val}
              label="Sub-Category"
            ></Select>
          </div>
        );
        setDropDown([...dropDown, temp]);

        // If leaf node is false then fetching attributs of that option
      } else if (!output.data.data[i].hasChildren) {
        attributesData(
          fetchAttributes({
            url: " https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/",
            payload: {
              barcode_exemption: false,
              browser_node_id: output.data.data[i].browseNodeId,
              category: output.data.data[i].category["primary-category"],
              sub_category: output.data.data[i].category["sub-category"],
            },
          })
        );
      }
    }
  };
  // displaying option of attributes in dropdown ......
  if (attributes.data !== undefined) {
    Object.keys(attributes.data.Mandantory).map((item) => {
      var obj = {
        value: item,
        label: item,
      };
      attributesOPtion.push(obj);
    });
  }
  // Here taking the selected attributes value.....
  const [AtributeOPtion, setAtributeOPtion] = useState("");
  const SelectAttributesHandler = (val) => {
    setAtributeOPtion(val);
  };

  // Taking value from user
  const InputHandler = (val) => {
    setInput(val);
  };
  var arr = [];
  const [tableVal, setTableVal] = useState([]);
  // ADD BUTTON FUNCTINALITY ....
  const AddHandler = () => {
    if (input === "" && FirstOPtion === "--Select--") {
      alert("please fill boxes");
    } else {
      var obj = {
        input: input,
        attributesValue: AtributeOPtion,
      };
      setTableVal([...tableVal, obj]);
      arr.push(obj);
      setInput("");
      setAtributeOPtion("--Select--");
    }
  };
  console.log(FirstOPtion);
  return (
    <>
      {loader ? <LinearProgress /> : null}
      <h2 style={{ fontSize: "3vw", marginBottom: "2%", marginTop: "2%" }}>
        Async Await and promises
      </h2>
      <div className="dropdown">
        <div>
          <br />
          {/* Showing selected option  */}
          {selected.map((item) => (
            <b key={Math.random()} style={{ fontSize: "1.3vw" }}>
              {item} {">"}{" "}
            </b>
          ))}
          {/* Dynamic dropdown  */}
          <div className="SubCategory">{dropDown}</div>
          <br />
          {/* Main category dropdown..... */}
          {option.length > 1 ? (
            <div style={{ display: output.showCat }}>
              <Select
                options={option}
                value={FirstOPtion}
                onChange={SelectHandler}
                label="Category"
                key={Math.random()}
              ></Select>
            </div>
          ) : null}
          <br />
          <br />
          {attributes.length === 0 ? null : (
            <div>
              <Select
                options={attributesOPtion}
                onChange={SelectAttributesHandler}
                value={AtributeOPtion}
                label="Attribute"
                key={Math.random()}
              ></Select>
              <br />
              <TextField onChange={InputHandler} value={input}></TextField>
              <br />
              <Button outline onClick={AddHandler}>
                Add
              </Button>
              <div>
                {tableVal.length === 0 ? null : (
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Attributes</th>
                          <th>Text</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableVal.map((item) => (
                          <tr key={Math.random()}>
                            <td>{item.input}</td>
                            <td>{item.attributesValue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          <br />
        </div>
      </div>
    </>
  );
};
