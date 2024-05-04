import {
   Edit,
   NumberInput,
   ReferenceInput,
   BooleanInput,
   SimpleForm,
   TextInput,
   required,
} from "react-admin";

export default function ChallengeOptionEdit() {
   return (
      <Edit>
         <SimpleForm>
            <NumberInput source="text" validate={[required()]} label="Title" />
            <BooleanInput source="correct" label="Correct option" />
            <ReferenceInput source="challengeId" reference="challenges" />
            <TextInput source="imageSrc" label="Image URL" />
            <TextInput source="audioSrc" label="Audio URL" />
         </SimpleForm>
      </Edit>
   );
}
