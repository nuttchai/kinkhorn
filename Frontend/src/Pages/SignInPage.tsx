import Button from '@material-ui/core/Button';

function SignInPage() {
  return (
    <>
      <div
        className="content-wrapper"
        style={{ textAlign: 'center', backgroundSize: 'cover' }}
      >
        <div style={{ transform: 'translate(0%,50%)' }}>
          <img src="https://d1hjxsusq6jw1u.cloudfront.net/Kinkhorn.gif" alt="Logo KK" width="250" height="160"></img>
          {/* <img src="./img/promo1.jpg" alt="Logo KK"></img> */}
          <div style={{ margin: '16px' }}>
            <div>WELCOME</div>
            <div>PLEASE LOGIN TO USE THE APP!</div>
          </div>
          <a href="https://kinkhorn.pongpich.xyz/oauth/google"> 
            {/* Sign In With KMITL */}
            <Button
              variant="contained"
              color="primary"
              // href="#contained-buttons"
            >
              Sign In With KMITL
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
