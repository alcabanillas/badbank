import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";

function BankForm({buttonSubmit,
  handle,
  fields,
  initialData,
  schema}) {

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, resetForm) => {
        const {result} = handle(values);
        if (result){
          resetForm({ values: initialData});
        }
      }}
      initialValues={initialData}
    >
      {({
        handleSubmit,
        handleChange,
        touched,
        isValid,
        errors,
        dirty
      }) => (
        <Form className="mb-3" noValidate onSubmit={handleSubmit}>
          {fields.map((elem, index) => {
            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label htmlFor={elem.id}>{elem.id}</Form.Label>
                <Form.Control
                  type={elem.type}
                  key={index}
                  id={elem.id}
                  onChange={handleChange}
                  placeholder={elem.placeholder}
                  isValid={touched[elem.id] && !errors[elem.id]}
                  isInvalid={!!errors[elem.id]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[elem.id]}
                </Form.Control.Feedback>
            </Form.Group>              
            )
          })}
          <div className="text-center">
            <Button disabled={!(isValid && dirty)} type="submit" className="btn btn-primary" data-testid={`btn${buttonSubmit.replace(" ", "")}`}>
              {buttonSubmit}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}


export default BankForm;
