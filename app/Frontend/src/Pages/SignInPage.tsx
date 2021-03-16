import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SignInPage() {
  return (
    <>
    <div>
      SignInpage
    </div>
    <Link to='/oauth/login'>Sign In With KMITL</Link>
    </>
  );
}

export default SignInPage;
