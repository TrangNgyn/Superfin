import { Input, Form } from "antd"
 
const inputTypeMapping = {
	input: Input
}

export default function GenerateFormItem ({ inputType, label, isRequired, inputName, requiredMessage}) {
	const FormComponent = inputTypeMapping[inputType];
	if(!isRequired){
		return(
			<Form.Item label={label} name={inputName}>
				<FormComponent/>
			</Form.Item>
		)
	} else {
		return(
			<Form.Item label={label} name={inputName} rules={[{required: {isRequired}, message: {requiredMessage}}]}>
				<FormComponent/>
			</Form.Item>
		)

	}
}