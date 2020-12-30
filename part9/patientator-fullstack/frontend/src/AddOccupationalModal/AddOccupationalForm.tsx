import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "./FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";

export type OccupationalHealthcareValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalHealthcareValues) => void;
  onCancel: () => void;
}

export const AddOccuptionForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        type: "OccupationalHealthcare",
        description: "",
        diagnosisCodes: [""],
        employerName: "",
        sickLeave: { startDate: "", endDate: "" }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Date format is invalid";
        const sickleaveErrors: { sickLeave: { [field: string] : string}} = {sickLeave: {}}
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if(!(Boolean(Date.parse(values.date)))){
          errors.date = dateError;
        }
        if(values.sickLeave) {
          if (values.sickLeave.endDate !== "" && !Boolean(Date.parse(values.sickLeave.endDate))) {
            sickleaveErrors.sickLeave.endDate = dateError;
          }
          if (values.sickLeave.startDate !== "" && !Boolean(Date.parse(values.sickLeave.startDate))) {
            sickleaveErrors.sickLeave.startDate = dateError;
          }
        }
        
        const isSickLeaveEmpty = Object.keys(sickleaveErrors.sickLeave).length === 0 ;
        return isSickLeaveEmpty ? errors : {...errors, ...sickleaveErrors};
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
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />   
            <Field
              label="Sick leave start date"
              placeholder="Start Date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="End Date"
              name="sickLeave.endDate"
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

export default AddOccuptionForm;