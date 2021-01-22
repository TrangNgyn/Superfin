import '../../_assets/CSS/pages/ViewOnlyOrder/ViewOnlyOrder.css';
import { Form, Input, Button } from 'antd';
import { useParams } from 'react-router-dom';

const ViewOnlyOrder = () => {
    const { po_number } = useParams();

    return (
        <div>
            <h1 class="view-order-text">Order Details</h1>
            <Form>
                <div id="view-order-row">
                    <div class="view-order-column">
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>                        
                    </div>
                    
                    <div class="view-order-column">
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>
                
                   
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>
                 
               
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>
               
                    
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>
                     
                   
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>
                        
                     
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>hello</div>
                            <Form.Item>
                                <Input style={{width: "500px"}} />
                            </Form.Item>
                    </div>
                
                </div>
            </Form>
        </div>
    );
}

export default ViewOnlyOrder;