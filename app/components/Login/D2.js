import React from 'react';
import request from 'superagent';

const login = function() {
  request
    .get('/d2login/')
    .use(this.context.server)
    .accept('json')
    .end((err, res) => {
      if( err ) {
        console.error(err);
      } else {
        const url = res.body.data;
        window.location = url;
      }
    });
};

export default login;
