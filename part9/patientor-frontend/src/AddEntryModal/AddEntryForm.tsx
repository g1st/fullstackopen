import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { useStateValue } from '../state';
import {
  TextField,
  DiagnosisSelection,
  NumberField,
  TypeSelection,
} from '../AddPatientModal/FormField';

import { EntryNoId, EntryTypes, HealthCheckRating } from '../types';

interface Props {
  onSubmit: (values: EntryNoId) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        type: EntryTypes.Hospital,
        specialist: '',
        diagnosisCodes: [],
        description: '',
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        healthCheckRating: HealthCheckRating.Healthy,
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values: EntryNoId) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type === EntryTypes.Hospital) {
          if (!values.discharge.date || !values.discharge.criteria) {
            errors.discharge = requiredError;
          }
        }
        if (values.type === EntryTypes.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        if (values.type === EntryTypes.HealthCheck) {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <TypeSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              types={Object.values(EntryTypes)}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
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
            {values.type === EntryTypes.Hospital ? (
              <>
                <Field
                  label="Date of discharge"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            ) : null}
            {values.type === EntryTypes.HealthCheck ? (
              <Field
                label="Health rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            ) : null}
            {values.type === EntryTypes.OccupationalHealthcare ? (
              <>
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />

                <Field
                  label="Sick leave start"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            ) : null}
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

export default AddEntryForm;
