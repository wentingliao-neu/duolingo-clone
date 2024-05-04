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

function UnitCreate() {
   return (
      <Create>
         <SimpleForm>
            <TextInput source="title" validate={[required()]} label="Title" />
            <TextInput
               source="description"
               validate={[required()]}
               label="Description"
            />
            <ReferenceInput source="courseId" reference="courses" />
            <NumberInput source="order" validate={[required()]} label="Order" />
         </SimpleForm>
      </Create>
   );
}

export default UnitCreate;
