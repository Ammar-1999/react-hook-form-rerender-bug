import { forwardRef, memo } from "react";
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

const InputControlled = memo(({ field }: { field: any }) => {
  return <input {...field} ref={null} />;
});

const ControllerInput = memo(
  ({ control, index }: { control: Control<any>; index: number }) => {
    return (
      <Controller
        control={control}
        name={`array.${index}.firstName`}
        render={({ field }) => <InputControlled field={field} />}
      />
    );
  }
);

const Input = memo((props: any) => {
  return <input type="text" {...props} />;
});
const Edit = memo(({ index }: { index: number }) => {
  const { register, control } = useFormContext();

  return (
    <div>
      <ControllerInput control={control} index={index} />
      <Controller
        control={control}
        name={`array.${index}.lastName`}
        render={({ field }) => <InputControlled field={field} />}
      />
      <Input {...register(`array.${index}.working`)} ref={null} />
    </div>
  );
});

const PageTest = memo(() => {
  const { control } = useFormContext();
  console.log("rerender because useFormContext");
  return <Test control={control} />;
});

const Test = memo(({ control }: { control: Control<any> }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "array",
  });

  return (
    <>
      <button
        type="button"
        onClick={() => {
          append({
            firstName: "",
            lastName: "",
            working: "",
          });
        }}
      >
        append
      </button>
      <br />
      <Fields fields={fields} remove={remove} />
    </>
  );
});

const Fields = memo(({ fields, remove }: { fields: any; remove: any }) => {
  return (
    <>
      {fields.map((field: any, index: number) => (
        <Field key={field.id} index={index} remove={remove} />
      ))}
    </>
  );
});

const Field = memo(({ index, remove }: { index: number; remove: any }) => {
  return (
    <fieldset>
      <Edit index={index} />
      <button className="remove" type="button" onClick={() => remove(index)}>
        Remove
      </button>
    </fieldset>
  );
});

export default PageTest;
