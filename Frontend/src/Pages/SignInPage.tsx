import Button from '@material-ui/core/Button';
import { useScreenClass } from 'react-grid-system';
import { useMemo } from 'react'

function SignInPage() {
  const screenClass = useScreenClass();
  const isMobile = useMemo(() => ['xs', 'sm'].includes(screenClass), [screenClass]);
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
            <div style = {{ display : 'flex',flexFlow : 'column', alignItems : 'center', margin : '8px'}}>
            <Button
              variant="contained"
              color="primary"
              // href="#contained-buttons"
            >
              Sign In With KMITL
            </Button>
            </div>
          </a>

            {isMobile ? <div></div>:
            <>
            <div style ={{display : 'flex',justifyContent : 'center',flexFlow : 'column'}}>
              <a href="https://kinkhorn.pongpich.xyz/oauth/card/login">  <Button
                  variant="contained"
                  color="default"
                  aria-label="contained primary button group"
                  >
                    Guest Log In
                  </Button>
              </a>
              <a href="https://kinkhorn.pongpich.xyz/oauth/card/exchange" style={{fontSize : '16px'}}>
                  exchange oauth card
              </a>
            </div>
            </>
                }
        </div>
        
      </div>
    </>
  );
}

export default SignInPage;
