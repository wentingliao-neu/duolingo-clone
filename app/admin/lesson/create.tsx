import {
   Create,
   Datagrid,
   List,
   NumberInput,
   ReferenceInput,
   SimpleForm,
   TextField,
   TextInput,
   required,
} from "react-admin";

export default function LessonCreate() {
   return (
      <Create>
         <SimpleForm>
            <TextInput source="title" validate={[required()]} label="Title" />
            <ReferenceInput source="unitId" reference="units" />
            <NumberInput source="order" validate={[required()]} label="Order" />
         </SimpleForm>
      </Create>
   );
}
