import { history } from '../../_helpers/history';
import { Input, Button, Form } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { orderStatusConstants } from '../../_constants/orderStatus.constants';
import { addTracking } from '../../_actions/incompleteOrderActions';
import { _logout } from '../../_services/SharedFunctions';

const OrderRow = props => {
    const o = props.order;
    const dispatch = props.dispatch;
    const access_token = props.access_token;
    const updateAuth = props.updateAuth;

    const [form_1] = useForm();
    const [form_2] = useForm();

    const date = new Date(o.issued_date);
    const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;





    const onFinish = () => {
        const promise_1 = form_1.validateFields();
        const promise_2 = form_2.validateFields();

        Promise.all([promise_1, promise_2])
        .then(values => {
            const trackingDetails = { 
                tracking_number: values[0].tracking_number,
                carrier: values[1].carrier,
                po_number: o.po_number
            }
            dispatch(addTracking(trackingDetails, access_token, updateAuth))
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 401) _logout(updateAuth);
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <>
            <tr className="current-orders-table-row" key = {o.po_number}>
                <td>{o.po_number}</td>
                <td>{o.c_email}</td>
                <td>{o.status}</td>
                <td>{dateString}</td>

                {
                    o.status === orderStatusConstants.NEW
                    ?
                    <>
                        <td>
                            <Form form = {form_1}>
                                <div style={{display: 'inline-block'}}>
                                    <Form.Item
                                        style = {{marginBottom: 0}}
                                        name="tracking_number"
                                        rules={[
                                            { required: true, 
                                                message: 'Invalid Input', 
                                                whitespace: true, 
                                                validateTrigger: 'onSubmit',
                                                max: 100,
                                            }
                                        ]}>
                                        <Input id={o.po_number}/>
                                    </Form.Item>
                                </div>
                            </Form>
                        </td>

                        <td>
                            <Form form = {form_2}>
                                <div style={{display: 'inline-block'}}>
                                    <Form.Item
                                        style = {{marginBottom: 0}}
                                        name="carrier"
                                        rules={[
                                            { required: true, 
                                                message: 'Invalid Input', 
                                                whitespace: true, 
                                                validateTrigger: 'onSubmit',
                                                max: 100,
                                            }
                                        ]}>
                                        <Input id={o.po_number}/>
                                    </Form.Item>
                                </div>
                            </Form>
                        </td>

                        <td>
                            <div style={{display: 'inline-block'}}>
                                <Button type="primary" onClick={onFinish}>Send</Button>
                            </div>
                        </td>
                    </>
                    :
                    <>
                        <td>{o.tracking_number}</td>
                        <td>{o.carrier}</td>
                        <td>details sent <CheckCircleOutlined style = {{color: "green"}}/></td>
                    </>
                }
                
                <td><b className="current-orders-view" onClick={() => {
                        history.push(`/order/${o.po_number}/${o.status}`);
                    }}>View</b>
                </td>
             </tr>
        </>
    );
}

export default  OrderRow;