import { Form, Input } from 'antd';
import { onlyNumbers } from '../../Helpers/NumberOnlyFunctions';

const NewItemForm = (props) => {
    return(
        <Form form={props.form} layout="vertical" style={{fontWeight: "bold"}}>
            <Form.Item 
                name='item_code' 
                label="Product Code"
                rules={[
                    {
                        required: true,
                        validateTrigger: 'onSubmit',
                        message: 'Please input a product code',
                    }
                ]}
            >
                <Input maxLength={100}/>
            </Form.Item>

            <Form.Item 
                name='quantity' 
                label="Quantity"
                rules={[
                    {
                        required: true,
                        validateTrigger: 'onSubmit',
                        message: 'Please input a required quantity',
                    },
                    {
                        validateTrigger: 'onSubmit',
                        validator: async (_, value) => {
                            if (Number(value) === 0){
                                return Promise.reject(new Error("Cannot have value of 0"));
                            } 
                        }
                    }
                ]}  
            >
                <Input maxLength={4} onChange={e => onlyNumbers(e, props.form, "quantity",)} style={{width: "50px"}} />
            </Form.Item>

            <Form.Item maxLength={200} name='special_requirements' label="Special Requirements">
                <Input/>
            </Form.Item>
        </Form>
    );
}

export default NewItemForm;