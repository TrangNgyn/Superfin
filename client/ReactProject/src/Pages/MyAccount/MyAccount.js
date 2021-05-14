import { Layout, Row, Avatar, Button, Form } from 'antd';
// import MyAccountSideMenu from '../MyAccount/MyAccountSideMenu'
import GenerateFormItem from '../../SharedComponents/Form/FormItem' // This will be in charge of creating the Form.Item for each of the elements below
import { UserOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';


const { Content } = Layout;
//const isAuthenticated = 1;

const formElements = [
    {
        inputType: "input",
        label: "First Name",
        isRequired: true,
        requiredMessage: "Please enter your first name!",
        inputName: "firstName"
    },
    {
        inputType: "input",
        label: "Last Name",
        isRequired: true,
        requiredMessage: "Please enter your last name!",
        inputName: "lastName"
    },
    {
        inputType: "input",
        label: "Email Address",
        isRequired: true,
        requiredMessage: "Please enter your email address!",
        inputName: "emailAddress"
    },
    {
        inputType: "input",
        label: "Mobile Number",
        isRequired: false,
        requiredMessage: "Please enter your mobile number!",
        inputName: "mobileNumber"
    },
    {
        inputType: "input",
        label: "Country Code",
        isRequired: false,
        requiredMessage: "",
        inputName: "countryCode"
    },
    {
        inputType: "input",
        label: "PO Attention To",
        isRequired: false,
        requiredMessage: "",
        inputName: "poAttentionTo"
    },
    {
        inputType: "input",
        label: "PO Address Line 1",
        isRequired: false,
        requiredMessage: "",
        inputName: "poAddressLineFirst"
    },
    {
        inputType: "input",
        label: "PO Address Line 2",
        isRequired: false,
        requiredMessage: "",
        inputName: "poAddressLineLast"
    },
    {
        inputType: "input",
        label: "PO Suburb",
        isRequired: false,
        requiredMessage: "",
        inputName: "poSuburb"
    },
    {
        inputType: "input",
        label: "PO State",
        isRequired: false,
        requiredMessage: "",
        inputName: "poState"
    },
    {
        inputType: "input",
        label: "PO Postal Code",
        isRequired: false,
        requiredMessage: "",
        inputName: "poPostCode"
    },
    {
        inputType: "input",
        label: "PO Country",
        isRequired: false,
        requiredMessage: "",
        inputName: "poCountry"
    }
];

export default function MyAccount(){
    //const [userType,setUseType] = useState(1);
    return(
        <Layout>
                {/* <Sider width = "256" className="my-account-sider-menu">
                    <MyAccountSideMenu/>
                </Sider> */}
            <Content>
                <Row>
                    <h1>My Account</h1>
                </Row>
                <Row className="my-account-username-avatar">
                    <Avatar size={128} icon={<UserOutlined/>} />
                    <h5>Username</h5>
                    <Button type="primary" icon={<EditOutlined />}>Edit</Button>
                </Row>
                <Row className="my-account-details">
                    <Form>
                        {formElements.map((element) => (<GenerateFormItem {...element}/>))}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined/>}>Save</Button>
                        </Form.Item>
                    </Form>
                </Row>
            </Content>
        </Layout>
    )
}
