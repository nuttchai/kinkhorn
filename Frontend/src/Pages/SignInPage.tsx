import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SignInPage() {
  return (
    <>
    <div className="content-wrapper" style={{textAlign : 'center'}}>
      <div>
        SignInpage
      </div>
      <a href='/oauth/google'>Sign In With KMITL</a>
    </div>
    </>
  );
}

export default SignInPage;
