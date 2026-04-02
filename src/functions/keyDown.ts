export function handleEnterKey(
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  callback: CallableFunction,
) {
  if (event.key === "Enter") {
    callback(false);
  }
}
