export function handleClick(event, value) {
  if (!value.disabled && value.onClick) {
    value.onClick();
  }
}

export function handleContextMenu(event, value) {
  event.preventDefault();

  if (!value.disabled && value.onContextMenu) {
    value.onContextMenu();
  }
}

export function handleSubmit(event, value) {
  event.preventDefault();

  if (!value.disabled && value.onSubmit) {
    value.onSubmit(new FormData(event.target));
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
