import React from 'react';
import request from 'superagent';

const login = function() {
  window.location = this.context.config.FB_URL;
};

export default login;

