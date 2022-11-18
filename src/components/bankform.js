import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export const BankForm = ({
  label,
  handle,
  fields,
  validateFields,
  initialValues,
}) => {
  const [valid, setValid] = useState(false);

  function clearForm() {
    formik.resetForm();
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(`OnSubmit: isValid=${formik.isValid} isSubmitting=${formik.isSubmitting}`)
      
      const { result } = handle(values);

      if (result) {
        clearForm();
      } 
    },
    validate: (values) => {
      return validateFields(values);
    },
  });


//Listen for Form inputs
useEffect(() => {
  const fields = formik.values;

  if (formik.isValid) {
    let validFields = true;

    for (const key of Object.keys(fields)) {
      const val = fields[key];
      if (val.trim().length === 0) validFields = false;
    } 
    setValid(validFields);
  }
  else {
    setValid(false);
  }
  
}, [formik.values, formik.isValid]);  

  return (
    <Form className="mb-3" onSubmit={formik.handleSubmit}>
      {fields.map((elem, index) => {
        return (
          <Form.Group className="mb-3" key={index}>
            <Form.Label htmlFor={elem.id}>{elem.id}</Form.Label>
            <Form.Control
              type={elem.type}
              key={index}
              id={elem.id}
              onChange={formik.handleChange}
              placeholder={elem.placeholder}
            />
            {formik.errors[elem.id] ? (
              <div id={`error${elem.id}`} className={"errorField mt-2"}>
                {formik.errors[elem.id]}
              </div>
            ) : null}
          </Form.Group>
        );
      })}
      <div className="text-center">
        <Button disabled={!valid} type="submit" className="btn btn-primary" data-testid={`btn${label.replace(' ','')}`}>
          {label}
        </Button>
      </div>
    </Form>
  );
};
