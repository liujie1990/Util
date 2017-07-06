import React, {PropTypes} from 'react';

const Link = ({active, children, onClick}) => {
  // console.log(children);
  // active用来判断当前All, Active, Completed是否处于被选中状态
  //为true表示被选中，则用span标签显示
  //为false表示没有被选中，用a标签显示
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#" onClick={e => {e.preventDefault();onClick();}}>
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link;
