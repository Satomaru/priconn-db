export function handleClick(event, props, ...args) {
  if (!props.disabled && props.onClick) {
    props.onClick(...args);
  }
}

export function handleContextMenu(event, props, ...args) {
  event.preventDefault();

  if (!props.disabled && props.onContextMenu) {
    props.onContextMenu(...args);
  }
}

export function handleChange(event, props, ...args) {
  if (!props.disabled && props.onChange) {
    props.onChange(...args);
  }
}

export function handleSubmit(event, props, ...args) {
  event.preventDefault();

  if (!props.disabled && props.onSubmit) {
    props.onSubmit(new FormData(event.target), ...args);
  }
}

export function alertWhenError(callback, ...args) {
  try {
    return callback(...args);
  } catch (error) {
    window.alert(error.message || error);
    throw error;
  }
}
