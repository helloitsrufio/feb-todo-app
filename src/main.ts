import "./style.css";
import { storage, type TaskItem } from "./todoStorage.ts";

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
      //we need to add sort by date functionality where we sort by the created date if not checked, and if it is checked, then sort by completion date
      //if checked, put completion date to now (timestamp), if unchecked, set it to null/undefined
      // merge the 2 arrays?
      //when an item is unset, maybe unset completion date?
      // i can do this!
      //it can be done!
      creationDate: Date.now(),
    });
    textInput.value = "";
  }
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

  let listItemFragment = document.createDocumentFragment();
  let sortedStorage = storage.sort((a, b) => +a.checked - +b.checked);

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
  const storageItem = storage.find((e) => {
    return e.id == currentItem.dataset.id;
  });
  //edit button functionality
  if (event.target.closest(".editButton")) {
    if (!currentItem || !currentItem.dataset.id) {
      return console.error("The item you're looking for doesn't exist!");
    }

    let editedListItemContent = currentItem.querySelector<HTMLInputElement>(
      'input[name="listItem"]',
    );
    if (!editedListItemContent) {
      return;
    }

    if (!storageItem) return;

    storageItem.listItemContent = editedListItemContent.value;
    displayList();
  }

  //check and uncheck checkbox
  let editedCheckbox = currentItem.querySelector<HTMLInputElement>(
    'input[name="listItemCheckbox"]',
  );

  editedCheckbox!.addEventListener<"change">("change", () => {
    storageItem!.checked = editedCheckbox!.checked;
    displayList();
  });
}

// //Delete list item
// document
//   .querySelector<HTMLDivElement>("#deleteButton")!
//   .addEventListener<"click">("click", deleteItem);

// function deleteItem(event: PointerEvent) {
//   console.log("deleted!");
// }
