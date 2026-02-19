//we want to make a place where we hold the list item val
//so probably an object that holds all of our list items
export type TaskItem = {
  listItemContent: string;
  checked: boolean;
  id: string;
};

export let storage: TaskItem[] = [];
