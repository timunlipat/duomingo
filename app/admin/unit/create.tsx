import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput} from "react-admin";

export const UnitCreate = () => {
    return(
        <Create>
            <SimpleForm>
                <TextInput source="title" label="Title"/>
                <TextInput source="description" label="Description"/>
                <ReferenceInput source="courseId" reference="courses"/>
                <NumberInput source="order" label="Order"/>
            </SimpleForm>
        </Create> 
    );
};