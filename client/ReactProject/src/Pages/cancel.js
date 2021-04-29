import {
Link
} from 'react-router-dom';

const Cancel = () =>{
    return (
      <>
        <div className="page-title-holder fill">
          <h2>Payment canceled</h2>
        </div>
        <div style={{textAlign: "center"}} >
          <p>Please click <Link to="/" >here</Link> to be directed back to our homepage</p>
        </div>
      </>
    )
}

export default Cancel
