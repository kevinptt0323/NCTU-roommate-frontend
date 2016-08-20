import React from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
const coverStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
export default ({style, children, loading, ...props}) => (
  <Paper
    style={{
      position: 'relative',
      ...style
    }}
    {...props}
  >
    <div style={{...coverStyle, display: loading ? null : 'none'}}>
      <CircularProgress />
    </div>
    {children}
  </Paper>
);
