import {
   Create,
   NumberInput,
   ReferenceInput,
   SelectInput,
   SimpleForm,
   TextInput,
   required,
} from "react-admin";

export default function ChallengeCreate() {
   return (
      <Create>
         <SimpleForm>
            <TextInput
               source="question"
               validate={[required()]}
               label="Title"
            />
            <SelectInput
               source="type"
               choices={[
                  { id: "SELECT", name: "SELECT" },
                  { id: "ASSIST", name: "ASSIST" },
               ]}
               validate={[required()]}
            />
            <ReferenceInput source="lessonId" reference="lessons" />
            <NumberInput source="order" validate={[required()]} label="Order" />
         </SimpleForm>
      </Create>
   );
}
