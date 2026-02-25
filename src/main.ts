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

function displayList() {
  const templateItem =
    document.querySelector<HTMLTemplateElement>("#listItemTemplate");

  let listItemFragment = document.createDocumentFragment();
  for (const item of storage) {
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
  .addEventListener<"click">("click", editItem);

// document
//   .querySelector<HTMLButtonElement>("#editButton")!
//   .addEventListener<"click">("click", editItem);

function editItem(event: PointerEvent) {
  if (!(event.target instanceof Element)) return;
  if (event.target.closest(".editButton")) {
    let currentItem: HTMLLIElement = event.target.closest(".listElement")!;
    if (!currentItem || !currentItem.dataset.id) {
      return console.error("The item you're looking for doesn't exist!");
    }
    const storageItemId = storage.find((e) => {
      return e.id == currentItem.dataset.id;
    });

    let editedListItemContent = currentItem.querySelector<HTMLInputElement>(
      'input[name="listItem"]',
    );
    if (!editedListItemContent) {
      return;
    }

    let editedText: TaskItem = {
      listItemContent: editedListItemContent.value,
      checked: false,
      id: currentItem.dataset.id,
    };
    console.log(editedText);
  }
}
// see if the button is even there
//if it is! then we need to grab the id of the nearest li elem
// console.log(event.target);
// console.log("clicked the edit button!", event.target.closest(".editButton"));
//get dataset val of input that the button belongs to!
// compare this val to the storage id to apply logic (reset val i think?)

// //Delete list item
// document
//   .querySelector<HTMLDivElement>("#deleteButton")!
//   .addEventListener<"click">("click", deleteItem);

// function deleteItem(event: PointerEvent) {
//   console.log("deleted!");
// }
