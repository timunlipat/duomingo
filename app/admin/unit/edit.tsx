import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput} from "react-admin";

export const UnitEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" label="Id"/>
                <TextInput source="title" label="Title"/>
                <TextInput source="description" label="Description"/>
                <ReferenceInput source="courseId" reference="courses"/>
                <NumberInput source="order" label="Order"/>
            </SimpleForm>
        </Edit> 
    );
};