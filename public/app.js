document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const title = event.target.dataset.title;
    let editNote = prompt("Введите новое название", title);
    if (editNote !== null) {
      edit(
        JSON.stringify({
          id: event.target.dataset.id,
          title: editNote,
        })
      ).then(() => {
        event.target.closest("li").children[0].innerText = editNote;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(editNote) {
  await fetch(`/${editNote}`, { method: "PUT" });
}
