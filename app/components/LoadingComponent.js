import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingComponent = ({loading=false, children=null, ...props}) => (loading ? (<CircularProgress {...props} />) : children);

export default LoadingComponent;

