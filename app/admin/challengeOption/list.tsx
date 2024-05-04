import {
   Datagrid,
   List,
   NumberField,
   ReferenceField,
   TextField,
   SelectField,
   BooleanField,
} from "react-admin";

export default function ChallengeOptionList() {
   return (
      <List>
         <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="text" />
            <BooleanField source="correct" />
            <TextField source="imageSrc" />
            <TextField source="audioSrc" />
            <ReferenceField source="challengeId" reference="challenges" />
         </Datagrid>
      </List>
   );
}
