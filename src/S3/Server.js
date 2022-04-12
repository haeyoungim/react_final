
import {useState} from "react";
import AWS from 'aws-sdk';
import { Row, Col, Button, Input, Alert } from 'reactstrap';

const Server = () =>{

const[selectedFile, setSelectedFile] = useState([]);


const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
// const RESION = 'us-east-2';
// const S3_BUCKET = 's3-bucket-react-file-upload-test-5jo';
const RESION = 'us-west-1';
const S3_BUCKET = 'viary';


AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY
});

const myBucket = new AWS.S3({
  params : {Bucket: S3_BUCKET},
  region : RESION,
})
const handleFileInput = e =>{
  const file = e.target.files[0];
  const randomName = Math.random().toString(36).substr(2,11);
  const imgName = randomName +"_"+ file.name  
  console.log(imgName);
  const fileExt = file.name.split('.').pop();  //파일익스텐션값 가져오기
  // if(file.type !== 'image/jpeg' || fileExt !=='jpg'){ //파일타입과 익스텐션이 jpg인것만
  //   alert('jpg 파일만 업로드 가능합니다.');
  //   return;
  // }
  setSelectedFile(e.target.files[0]);
}

const uploadFile = file => { //챕터4!의 사진을 업로드 하는 코드
  const params = {
    Bucket: S3_BUCKET,
    Key: "upload/" + file.name,
    Body: file
  };
  myBucket.putObject(params)
  .on('httpUploadProgress',(evt)=>{
    setTimeout(()=>{
      setSelectedFile(null);
    }, 3000)
  })
  .send((err)=>{
    if(err)console.log(err)
  })
}
const S3Url="https://viary.s3.us-west-1.amazonaws.com/upload/";

  return (
    <div className="App">
        <Row>
          <Col>
            <Input color="primary" type="file" onChange={handleFileInput}/>
            {selectedFile?(
            //   <Button color="primary" onClick={() => console.log(selectedFile)}> Upload to S3</Button>
              <Button color="primary" onClick={() => uploadFile(selectedFile)}> Upload to S3</Button>
            ) : null }
            
          </Col>
        </Row>
      </div>
      );
            }

  export default Server;