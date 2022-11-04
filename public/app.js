document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    let editNote = prompt("Введите новое название");
    if (editNote) {
      newNote = {
        id: event.target.dataset.id,
        title: editNote,
      };
      edit(JSON.stringify(newNote)).then(() => {
        // console.log("1=", event.target.closest("li").children[0].innerHTML);
        // event.target.closest("li").p.innerHTML = editNote;
      });
      event.target.closest("li").children[0].innerHTML = editNote;
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(editNote) {
  await fetch(`/${editNote}`, { method: "PUT" });
}
