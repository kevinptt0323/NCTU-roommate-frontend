import React from 'react';
import request from 'superagent';

const login = function() {
  window.location = this.context.config.SERVER_HOST + '/fblogin/';
};

export default login;

