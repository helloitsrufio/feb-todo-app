import "./style.css";
import { storage } from "./todoStorage.ts";

//create a list item
document
  .querySelector<HTMLInputElement>("#listItemContent")!
  .addEventListener<"keydown">("keydown", addListItemContent);
const textInput = document.querySelector<HTMLInputElement>("#listItemContent")!;

function addListItemContent(event: KeyboardEvent) {
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
document
  .querySelector<HTMLInputElement>("#listItemCheckbox")!
  .addEventListener<"change">("change", checkOffItem);

function checkOffItem(event: Event) {
  console.log("changed!");
}
//display list item? (read)

//Edit list item (update)
document
  .querySelector<HTMLDivElement>("#editButton")!
  .addEventListener<"click">("click", editItem);

function editItem(event: PointerEvent) {
  console.log("edited!");
}

//Delete list item
document
  .querySelector<HTMLDivElement>("#deleteButton")!
  .addEventListener<"click">("click", deleteItem);

function deleteItem(event: PointerEvent) {
  console.log("deleted!");
}
