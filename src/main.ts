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
    console.log(storage);
  }
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
  console.log(templateItem);
  let listItemFragment = document.createDocumentFragment();
  for (const item of storage) {
    const listItem = templateItem?.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLLIElement;

    const checkbox = listItem.querySelector<HTMLInputElement>(
      'input[name="listItemCheckbox"]',
    );

    const textInput = listItem.querySelector<HTMLInputElement>(
      'input[name="listItem"]',
    );

    checkbox!.checked = item.checked;
    textInput!.value = item.listItemContent;

    listItem.dataset.id = item.id;

    listItemFragment.appendChild(listItem);
  }
  const listContainer = document.querySelector<HTMLUListElement>("#list");

  listContainer!.innerHTML = "";
  listContainer?.appendChild(listItemFragment);
  console.log(listContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  displayList();
});

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
