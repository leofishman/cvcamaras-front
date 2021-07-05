import { writable, derived } from 'svelte/store'

export const user = writable(null)
export const transactions = writable([])
export const sortedTransactions = derived(transactions, (value) => value.sort((a, b) => b.date - a.date))
export const balance = derived(transactions, (value) => value.reduce((acc, t) => acc + t.value, 0))
export const income = derived(transactions, (value) =>
    value.filter((t) => t.value > 0).reduce((acc, t) => acc + t.value, 0)
)
export const expenses = derived(transactions, (value) =>
    value.filter((t) => t.value < 0).reduce((acc, t) => acc + t.value, 0)
)
export const cameras = writable([])
export const pageAction = writable(null)
export const config = writable([])

// Toast 
// https://dev.to/danawoodman/svelte-quick-tip-creating-a-toast-notification-system-ge3

export const toasts = writable([]);

export const addToast = (toast) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults = {
    id,
    type: "info",
    dismissible: true,
    timeout: 3000,
  };
  console.log(34, toast)
  // Push the toast to the top of the list of toasts
  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};
