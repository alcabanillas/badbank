import { BankCard } from "./bankcard";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";

export const BankForm = ({
  bgcolor,
  label,
  handle,
  fields,
  validateFields,
  initialValues,
  hideAmount,
  successButton,
}) => {
  const [show, setShow] = useState(true);

  function clearForm() {
    formik.resetForm({values : ''});
    setShow(true);
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(`OnSubmit: isValid=${formik.isValid} isSubmitting=${formik.isSubmitting}`)
      //if (!formik.isValidating && formik.isSubmitting) {
      
        const { result, errorMessage } = handle(values);

        if (result) {
          clearForm();
        } else {
          alert(errorMessage);
        }
      //}
    },
    validate: (values) => {
      return validateFields(values);
    },
  });

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
              <div id={`error${elem.id}`} style={{ color: "red" }}>
                {formik.errors[elem.id]}
              </div>
            ) : null}
          </Form.Group>
        );
      })}
      <Button type="submit" className="btn btn-light" data-testid={`btn${label.replace(' ','')}`}>
        {label}
      </Button>
    </Form>
  );
};
