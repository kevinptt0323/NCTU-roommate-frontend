import React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';

require('react-tap-event-plugin')();
require('normalize-css');

render(<Routes />, document.getElementById('app'));

