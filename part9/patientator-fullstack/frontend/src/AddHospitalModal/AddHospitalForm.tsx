import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "./FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

export type HospitalEntryValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalEntryValues) => void;
  onCancel: () => void;
}

export const AddHospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "Hospital",
        description: "",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Date format is invalid";
        const errors: { [field: string]: string } = {};
        const dischargeErrors: { discharge: { [field: string] : string}} = {discharge: {}};
        
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if(!Boolean(Date.parse(values.date))){
          errors.date = dateError;
        }
       
        if(!values.discharge.date){
          dischargeErrors.discharge.date = requiredError;
        }
        else if(!Boolean(Date.parse(values.discharge.date))){
          dischargeErrors.discharge.date = dateError;
        }
        
        if(!values.discharge.criteria){
          dischargeErrors.discharge.criteria = requiredError;
        }
        
        const isDischargeEmpty = Object.keys(dischargeErrors.discharge).length === 0 
        return isDischargeEmpty ? errors : {...errors,...dischargeErrors};
      }}
    >
      {({ isValid, dirty,setFieldValue, setFieldTouched  }) => {
        return (
          <Form className="Healthcheck form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />   
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalForm;