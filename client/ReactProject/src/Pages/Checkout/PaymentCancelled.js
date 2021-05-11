import { Link } from 'react-router-dom'; 
import React, { useEffect } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { Row } from 'antd';

const PaymentCancelled = () =>{
  // clean up after component unloads
  useEffect(() => {

    const onbeforeunloadFn = () => {
      localStorage.removeItem('products')
    }

    window.addEventListener('beforeunload', onbeforeunloadFn);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunloadFn);
    }
  }, [])

    return (
      <>
        <div className="page-title-holder fill">
          <h2>Payment canceled</h2>
        </div>
        <div style={{textAlign: "center"}} >
          <Row justify="space-around" align="middle" >
            <p>
              <CloseCircleFilled style={{ fontSize: '400%', color: '#EB6E00'}} />
            </p>
          </Row>
          
          <Row justify="space-around" align="middle" >
            <p>Your have cancelled the payment.</p>
          </Row>
          <Row justify="space-around" align="middle" >
            <p>Please click <Link to="/" >here</Link> to continue shopping.</p>
          </Row>
        </div>
      </>
    )
}

export default PaymentCancelled
