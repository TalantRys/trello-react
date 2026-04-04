export function handleEnterKey(
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  callback: CallableFunction,
) {
  if (!event.shiftKey && event.key === "Enter") {
    callback(false);
    (event.target as HTMLInputElement | HTMLTextAreaElement).blur();
  }
}
