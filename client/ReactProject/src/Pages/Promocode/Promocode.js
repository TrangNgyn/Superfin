import '../../_assets/CSS/pages/Promocode.css';
import {Row, Col, Typography, Input,Button} from 'antd';
import {EditFilled} from '@ant-design/icons';



const { Title } = Typography;


const Promocode = () =>{
    return (
        <div>
            <div id="promocode-window">
                Admin Station
            </div>
            <div id="promocode-content">
            <Title level={3}>Promocode management</Title>
            <div>
                <Row>Edit Promo Code: </Row>
                <Row>
                  <Col><Input /></Col>
                  <Col><Button type="text"><EditFilled /></Button></Col>
                </Row>
            </div>
            </div>
        </div>
    )
};

export default Promocode;
