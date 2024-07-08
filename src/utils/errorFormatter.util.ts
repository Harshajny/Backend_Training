import { ValidationError } from "class-validator";

export const errorFormatter = (errors: ValidationError[]) => {
  let subConstraints = [];
  let constraints = [];

  if (!errors[0].children.length)
    constraints = errors.map(
      ({ constraints }) => Object.values(constraints)[0]
    );
  else if (errors[0].children.length)
    subConstraints = errors[0].children.map(
      ({ constraints }) => Object.values(constraints)[0]
    );
  return [...constraints, ...subConstraints];
};