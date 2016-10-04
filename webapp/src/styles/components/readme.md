.login {
    background-color: #00a65a;
    height: 100%;
    position: absolute;
    width: 100%;
    .middle-box {
      max-width: 400px;
        z-index: 100;
        margin: 0 auto;
          width: 300px;
          padding-top: 16%;
          .form-control {
            width: 100%;
            border-color: #eee;
          }
    }
}

.login-icon {
    left: 50%;
    top: 0;
    position: absolute;
    width: 96px;
    margin-left: -268px;
    padding-top: 16%;
    display: block;
}

.login-icon > h4 {
    font-size: 16px;
    font-weight: 200;
    line-height: 34px;
    opacity: 0.95;
    margin-top: 4px;
    color: #fff;
}

.login-icon > h4 small {
    color: inherit;
    display: block;
    font-size: inherit;
    font-weight: 700;
}

.login-icon > img {
    display: block;
    margin-bottom: 6px;
    width: 100%;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
    border: 0;
}

.login-form {
    background-color: #eceff1;
    border-radius: 6px;
    padding: 24px 23px 20px;
    position: relative;
    input {
      outline: none;
    }
}

.login-form:before {
    content: "";
    border-style: solid;
    border-width: 12px 12px 12px 0;
    border-color: transparent #eceff1 transparent transparent;
    height: 0px;
    position: absolute;
    left: -12px;
    top: 35px;
    width: 0;
    -webkit-transform: rotate(360deg);
}

.login-form .control-group {
    margin-bottom: 12px;
    position: relative;
}

.login-form .login-field-icon {
    color: #bfc9ca;
    font-size: 16px;
    position: absolute;
    right: 13px;
    top: 14px;
    -webkit-transition: 0.25s;
    -moz-transition: 0.25s;
    -o-transition: 0.25s;
    transition: 0.25s;
    -webkit-backface-visibility: hidden;
}

.login-form .login-field {
    border-color: transparent;
    padding-bottom: 8px;
    padding-top: 8px;
    text-indent: 3px;
    width: 100%;
}

@media (max-width: 768px) {
    .login-icon {
      display: none;
    }
    .login-form:before {
      border-width: 0;
    }
    .login .middle-box {
      padding-top: 30%;
    }
}

.animated {
  -webkit-animation-duration: 0.4s;
    animation-duration: 0.4s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    z-index: 100;
}

.fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
}

@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
