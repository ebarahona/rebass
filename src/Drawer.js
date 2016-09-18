
import React from 'react'
import classnames from 'classnames'
import withRebass from './withRebass'

/**
 * An off-canvas drawer component
 */

const Drawer = ({
  open,
  size,
  position,
  onDismiss,
  className,
  style,
  theme,
  subComponentStyles,
  ...props
}) => {
  const { scale, zIndex, colors } = theme

  const placements = {
    top: {
      top: 0,
      right: 0,
      left: 0
    },
    right: {
      top: 0,
      right: 0,
      bottom: 0
    },
    bottom: {
      right: 0,
      bottom: 0,
      left: 0
    },
    left: {
      top: 0,
      bottom: 0,
      left: 0
    }
  }

  let width
  let height
  let transform

  if (position === 'top' || position === 'bottom') {
    height = size
  } else {
    width = size
  }

  const transforms = {
    top: 'translateY(-100%)',
    right: 'translateX(100%)',
    bottom: 'translateY(100%)',
    left: 'translateX(-100%)'
  }

  if (!open) {
    transform = transforms[position]
  }

  const cx = classnames('Drawer', className)

  const sx = {
    content: {
      position: 'fixed',
      ...placements[position],
      zIndex: zIndex[4],
      width,
      height,
      padding: scale[2],
      transform,
      transition: 'transform .2s ease-out',
      overflowX: 'hidden',
      overflowY: 'scroll',
      color: colors.white,
      backgroundColor: colors.default,
      ...style
    },
    dismiss: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: zIndex[3],
      display: open ? null : 'none',
      ...subComponentStyles.dismiss
    }
  }

  return (
    <div className={cx}>
      <div style={sx.dismiss}
        onClick={onDismiss} />
      <div
        {...props}
        className='Drawer Drawer_content'
        style={sx.content} />
    </div>
  )
}

Drawer.propTypes = {
  /** Width or height of drawer, depending on placement */
  size: React.PropTypes.number,
  /** Shows and hides the drawer */
  open: React.PropTypes.bool,
  /** Position relative to the viewport */
  position: React.PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left'
  ]),
  /** Click event callback for the background overlay */
  onDismiss: React.PropTypes.func
}

Drawer.defaultProps = {
  open: false,
  size: 320,
  position: 'left',
  onDismiss: function () {}
}

export default withRebass(Drawer)

