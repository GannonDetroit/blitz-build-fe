import React, { Component } from 'react';
import {axiosWithAuth} from '../../utils/auth/axiosWithAuth';
import {link}from 'react-router'
import Dropzone from  './Dropzone'
let user_id = localStorage.getItem("user_id")
class Uploader extends Component {

  constructor(props){
    super(props);
    this.state = {
      success : false,
      doc_url : "",
      user_id:localStorage.getItem('user_id'),
      file_name:'',
      project_id:1
    }
    console.log(this.state)
  }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
    
  }
  // Perform the upload
  handleUpload = (ev) => {
    console.log(ev)
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    //Calls BE to get validated url 
    axiosWithAuth().post("/docs/documents",{
      fileName : fileName,
      fileType : fileType,
      user_id:this.state.user_id
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({doc_url: url,file_name:fileName})
      console.log("Recieved a signed request " + signedRequest);
      console.log(this.state)
     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      //Uploads File to S3 bucket
      axiosWithAuth().put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
})
.then(
 
      axiosWithAuth().post('docs/url',{
        doc_url : this.state.doc_url,
      user_id: this.state.user_id,
      file_name:this.state.file_name,
      project_id:this.state.project_id}))
      
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {
    const Success_message = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
       
      
      </div>
    )
    return (
      <div className="Uploader">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <Success_message/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
   
      </div>
    );
  }
}
export default Uploader;