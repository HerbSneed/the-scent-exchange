import React from "react";

const TestEnvVars = () => {
  console.log("Cloud Name:", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  console.log("Upload Preset:", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  return <div>Check the console for environment variables</div>;
};

export default TestEnvVars;
