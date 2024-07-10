import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";

export const ChallengeCreate = () => {
    return(
        <Create>
            <SimpleForm>
                <TextInput source="question" label="Question"/>
                <SelectInput
                    source="type" 
                    choices={[
                        {
                            id: "SELECT",
                            name: "SELECT",
                        },
                        {
                            id: "ASSIST",
                            name: "ASSIST",
                        },
                    ]}
                />
                <ReferenceInput source="lessonId" reference="lessons"/>
                <NumberInput source="order" label="Order"/>
            </SimpleForm>
        </Create> 
    );
};