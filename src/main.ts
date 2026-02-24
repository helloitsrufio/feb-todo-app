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

// //Edit list item (update)
// document
//   .querySelector<HTMLDivElement>("#editButton")!
//   .addEventListener<"click">("click", editItem);

// function editItem(event: PointerEvent) {
//   console.log("edited!");
// }

// //Delete list item
// document
//   .querySelector<HTMLDivElement>("#deleteButton")!
//   .addEventListener<"click">("click", deleteItem);

// function deleteItem(event: PointerEvent) {
//   console.log("deleted!");
// }
