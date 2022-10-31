import { BankCard } from "./bankcard";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const BankForm = ({
  bgcolor,
  label,
  handle,
  fields,
  hideAmount,
  successButton,
}) => {
  const [inputFields, setInputFields] = useState(fields);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);

  function validate(fieldName, fieldValue) {
    if (!fieldValue) {
      setStatus(`Error: ${fieldName}`);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleInputChange(index, event) {
    const values = [...inputFields];
    values[index]["value"] = event.target.value;

    setInputFields(values);
  }

  function clearForm() {
    setInputFields(fields);
    setShow(true);
  }

  function handleSubmit(event) {
    if (fields.every((elem) => validate(elem.name, elem.value))) {
      let data = {};
      inputFields.map((elem) => {
        data[elem.name] = elem.value;
      });
      if (handle(data)) {
        setShow(false);
      }
      event.preventDefault();
    }
  }

  return (
    <BankCard
      bgcolor={bgcolor}
      header={label}
      status={status}
      body={
        show ? (
          <Form className="mb-3">
            {fields.map((elem, index) => {
              return (
                <Form.Group className="mb-3" key={index}>
                  <Form.Label>{elem.name}</Form.Label>
                  <Form.Control type={elem.type} key={index}
                    id={elem.name} placeholder={elem.placeholder} value={elem.value}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Form.Group>
              );
            })}
            <Button type="submit" className="btn btn-light" onClick={handleSubmit}>
              {label}
            </Button>
          </Form>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              {successButton}
            </button>
          </>
        )
      }
    />
  );
};
