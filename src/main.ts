import "./style.css";

type TaskItem = {
  listItemContent: string;
  checked: boolean;
  id: string;
  creationDate: number;
  completionDate?: Date;
};

let storage: TaskItem[] = [];

//create a list item
document
  .querySelector<HTMLInputElement>("#addListItem")!
  .addEventListener<"keydown">("keydown", addListItem);
const textInput = document.querySelector<HTMLInputElement>("#addListItem")!;

function addListItem(event: KeyboardEvent) {
  if (event.key == "Enter") {
    storage.push({
      listItemContent: textInput.value,
      checked: false,
      id: crypto.randomUUID(),
      creationDate: Date.now(),
    });
    textInput.value = "";
  }
  localStorage.setItem("1", JSON.stringify(storage));
  displayList();
}

//when box is checked, cross out
// document
//   .querySelector<HTMLInputElement>("#listItemCheckbox")!
//   .addEventListener<"change">("change", checkOffItem);

// function checkOffItem(event: Event) {
//   console.log("changed!");
// }

//Need to rename basically every variable because the names are bad and so confusing.
//Also, need to add check item functionality
function displayList() {
  const templateItem =
    document.querySelector<HTMLTemplateElement>("#listItemTemplate");

  let fetchedLocalStorage = localStorage.getItem("1");
  if (!fetchedLocalStorage) {
    return [] as TaskItem[];
  }
  storage = JSON.parse(fetchedLocalStorage);

  let listItemFragment = document.createDocumentFragment();

  // sort unchecked todos
  const sortedUncheckedStorage = storage
    .filter((item) => !item.checked)
    .sort((a, b) => a.creationDate - b.creationDate);

  // sort checked todos
  const sortedCheckedStorage = storage
    .filter((item) => item.checked)
    .sort((a, b) => {
      return (
        (a.completionDate?.getTime() ?? 0) - (b.completionDate?.getTime() ?? 0)
      );
    });

  const sortedStorage = sortedUncheckedStorage.concat(sortedCheckedStorage);

  //TODO: write this next part better? null checks? no 'as TYPE'?
  //if(!template item {what happens})
  //(!firstElemChild {not clone})
  for (const item of sortedStorage) {
    const listItem = templateItem?.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLLIElement;

    const checkbox = listItem.querySelector<HTMLInputElement>(
      'input[name="listItemCheckbox"]',
    );

    const textContent = listItem.querySelector<HTMLInputElement>(
      'input[name="listItem"]',
    );

    checkbox!.checked = item.checked;
    textContent!.value = item.listItemContent;

    listItem.dataset.id = item.id;

    listItemFragment.appendChild(listItem);
  }

  const listContainer = document.querySelector<HTMLUListElement>("#list");

  listContainer!.innerHTML = "";
  listContainer?.appendChild(listItemFragment);
}

//Edit list item (update)
document
  .querySelector<HTMLUListElement>("#list")!
  .addEventListener<"click">("click", editInputItem);

function editInputItem(event: PointerEvent) {
  if (!(event.target instanceof Element)) return;
  let currentItem: HTMLLIElement = event.target.closest(".listElement")!;
  //null check
  if (!currentItem || !currentItem.dataset.id) {
    return console.error("The item you're looking for doesn't exist!");
  }

  let fetchedLocalStorage = JSON.parse(localStorage.getItem("1") ?? "");

  const storageItem = fetchedLocalStorage.find((item: TaskItem) => {
    return item.id == currentItem.dataset.id;
  });

  //edit button functionality
  if (event.target.closest(".editButton")) {
    // if (!currentItem || !currentItem.dataset.id) {
    //   return console.error("The item you're looking for doesn't exist!");
    // }

    let editedListItemContent = currentItem.querySelector<HTMLInputElement>(
      'input[name="listItem"]',
    );
    if (!editedListItemContent) {
      return;
    }

    if (!storageItem) return;

    storageItem.listItemContent = editedListItemContent.value;

    //TODO: index is changing upon filter (and editing in general). THIS WORKS WITH LOCAL STORAGE, but also not quite, k?
    const filteredStorage = fetchedLocalStorage.filter(
      (item: TaskItem) => item.id != currentItem.dataset.id,
    );
    const mergedStorage = [...filteredStorage, storageItem];

    localStorage.setItem("1", JSON.stringify(mergedStorage));
    displayList();
  }

  //check and uncheck checkbox
  let editedCheckbox = currentItem.querySelector<HTMLInputElement>(
    'input[name="listItemCheckbox"]',
  );

  editedCheckbox!.addEventListener<"change">("change", () => {
    storageItem!.checked = editedCheckbox!.checked;
    storageItem!.completionDate = new Date();
    displayList();
  });
}

//Delete list item
document
  .querySelector<HTMLUListElement>("#list")!
  .addEventListener<"click">("click", deleteItem);

function deleteItem(event: PointerEvent) {
  if (!(event.target instanceof Element)) return;
  //on click on delete button
  let currentItem: HTMLLIElement = event.target.closest(".listElement")!;
  if (event.target.closest(".deleteButton")) {
    if (!currentItem || !currentItem.dataset.id) {
      return console.error("The item you're looking for doesn't exist!");
    }
    //grab a specific elem in the arr
    const storageItem = storage.find((e) => {
      return e.id == currentItem.dataset.id;
    });
    //reassign storage to filter out specific item we grabbed
    localStorage.setItem(
      "1",
      JSON.stringify(storage.filter((item) => !(storageItem == item))),
    );
    displayList();
  }
}

displayList();
